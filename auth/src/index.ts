import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

// middlewares
app.use(express.json());

// routers
app.use("/api/users/currentuser", currentUserRouter);
app.use("/api/users/signup", signUpRouter);

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
