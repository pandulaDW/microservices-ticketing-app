import { Router, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@pweerasotickets/common";

const router = Router();

const validators = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 an 20 characters"),
  validateRequest,
];

router.post("/", validators, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email in use");
  }

  const user = User.build({ email, password });
  await user.save();

  const userJwt = jwt.sign(
    { id: user.id, email },
    process.env.JWT_KEY as string
  );

  // provided by cookie-session middleware
  req.session = {
    jwt: userJwt,
  };

  res.status(201).json(user);
});

export { router as signUpRouter };
