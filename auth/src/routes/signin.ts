import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { Password } from "../services/password";
import { validateRequest, BadRequestError } from "@pweerasotickets/common";

const router = Router();

const validators = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("Password must not be empty"),
  validateRequest,
];

router.post("/", validators, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }

  const passwordsMatch = await Password.compare(
    existingUser.get("password"),
    password
  );

  if (!passwordsMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  const userJwt = jwt.sign(
    { id: existingUser.get("_id"), email },
    process.env.JWT_KEY as string
  );

  // provided by cookie-session middleware
  req.session = {
    jwt: userJwt,
  };

  res.status(200).json(existingUser);
});

export { router as SignInRouter };
