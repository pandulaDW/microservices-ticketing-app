import express from "express";
import mongoose from "mongoose";
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
    secure: true,
  })
);

// routers
app.use("/api/users/signup", signUpRouter);
app.use("/api/users/signin", SignInRouter);
app.use("/api/users/signout", signOutRouter);
app.use("/api/users/currentuser", currentUserRouter);

// global error handler
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB connection successful");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Auth service listening at port 3000...");
  });
};

// start the application
start();
