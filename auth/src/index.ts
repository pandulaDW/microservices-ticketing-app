import express from "express";
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";

const app = express();

// middlewares
app.use(express.json());

// routers
app.use("/api/users/currentuser", currentUserRouter);
app.use("/api/users/signup", signUpRouter);

app.listen(3000, () => {
  console.log("Auth service listening at port 3000...");
});
