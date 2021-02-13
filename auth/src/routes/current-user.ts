import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }
  const token = req.session.jwt;

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY as string);
    res.send({ currentUser: payload });
  } catch (err) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
