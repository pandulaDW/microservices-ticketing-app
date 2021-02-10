import express from "express";

const app = express();

app.use(express.json());

app.get("/api/users/currentuser", (_, res) => {
  res.send("Hi there!");
});

app.listen(3000, () => {
  console.log("Auth service listening at port 3000...");
});
