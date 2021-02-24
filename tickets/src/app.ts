import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { errorHandler } from "@pweerasotickets/common";

const app = express();
app.set("trust proxy", true);

// middlewares
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);

// global error handler
app.use(errorHandler);

export { app };
