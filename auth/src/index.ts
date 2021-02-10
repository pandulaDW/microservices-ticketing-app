import express from "express";

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("Auth service listening at port 3000..."));
