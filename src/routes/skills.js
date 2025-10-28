import { Router } from "express";
import wrap from "../utils/responseWrapper.js";
import Skill from "../models/skill.model.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(wrap(skills));
  } catch (err) {
    next(err);
  }
});

export default router;
