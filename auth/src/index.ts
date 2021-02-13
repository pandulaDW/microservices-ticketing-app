import mongoose from "mongoose";
import { app } from "./app";

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
