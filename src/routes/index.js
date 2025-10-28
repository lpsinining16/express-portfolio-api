import { Router } from "express";
import profileRouter from "./profile.js";
import navLinksRouter from "./navLinks.js";
import projectsRouter from "./projects.js";
import skillsRouter from "./skills.js";
import workExperienceRouter from "./workExperience.js";

const router = Router();

// Mount all the specific routers
router.use("/profile", profileRouter);
router.use("/nav-links", navLinksRouter);
router.use("/projects", projectsRouter);
router.use("/skills", skillsRouter);
router.use("/work-experience", workExperienceRouter);

export default router;
