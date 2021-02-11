import { ErrorRequestHandler } from "express";
import { RequestValidationError } from "../errors/request-validation-err";
import { DatabaseConnectionError } from "../errors/db-connection-err";

export const errorHandler: ErrorRequestHandler = (err: Error, req, res, _) => {
  if (err instanceof RequestValidationError)
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });

  if (err instanceof DatabaseConnectionError)
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });

  res.status(500).json({ errors: [{ message: "Something went wrong" }] });
};
