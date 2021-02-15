import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { SignInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";

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

// routers
app.use("/api/users/signup", signUpRouter);
app.use("/api/users/signin", SignInRouter);
app.use("/api/users/signout", signOutRouter);
app.use("/api/users/currentuser", currentUserRouter);

// global error handler
app.use(errorHandler);

export { app };
