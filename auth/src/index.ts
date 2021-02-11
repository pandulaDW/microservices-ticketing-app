import express from "express";
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

// middlewares
app.use(express.json());

// routers
app.use("/api/users/currentuser", currentUserRouter);
app.use("/api/users/signup", signUpRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Auth service listening at port 3000...");
});
