import { Router } from "express";
import { currentUser } from "../middlewares/current-user";

const router = Router();

router.get("/", currentUser, (req, res) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
