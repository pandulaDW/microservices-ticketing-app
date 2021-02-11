import { Router, Request, Response } from "express";
import { body } from "express-validator";

const router = Router();

const validators = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 an 20 characters"),
];

router.get("/", validators, (req: Request, res: Response) => {
  const { email, password } = req.body;
});

export { router as signUpRouter };
