import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler: ErrorRequestHandler = (err: Error, req, res, _) => {
  if (err instanceof CustomError)
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });

  res.status(500).json({ errors: [{ message: "Something went wrong" }] });
};
