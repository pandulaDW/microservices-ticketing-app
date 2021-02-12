import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-err";

const router = Router();

const validators = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 an 20 characters"),
];

router.post("/", validators, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.send("bitch");
  }

  const user = User.build({ email, password });
  await user.save();

  res.status(201).send(user);
});

export { router as signUpRouter };
