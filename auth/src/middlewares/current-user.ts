import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, _: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }
  const token = req.session.jwt;

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as UserPayload;

    req.currentUser = payload;
  } catch (err) {}

  next();
};
