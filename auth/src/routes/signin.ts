import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

const router = Router();

const validators = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("Password must not be empty"),
  validateRequest,
];

router.post("/", validators, (req: Request, res: Response) => {
  res.send({});
});

export { router as SignInRouter };
