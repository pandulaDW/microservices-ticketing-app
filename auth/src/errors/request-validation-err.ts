import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  statusCode = 400;
  public errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super();
    this.errors = errors;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.param,
    }));
  }
}
