import { ErrorRequestHandler } from "express";
import { RequestValidationError } from "../errors/request-validation-err";
import { DatabaseConnectionError } from "../errors/db-connection-err";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  next
) => {
  if (err instanceof RequestValidationError) {
    console.log("validation error");
  }

  if (err instanceof DatabaseConnectionError) {
    console.log("db error");
  }

  res.status(400).send({ message: err.message });
};
