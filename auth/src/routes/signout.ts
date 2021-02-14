import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.session = null;
  res.status(204).send({});
});

export { router as signOutRouter };
