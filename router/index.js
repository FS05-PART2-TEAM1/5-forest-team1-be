import express from "express";
const router = express.Router();

import studyRouter from "./study/index.js";
import habitRouter from "./habit/index.js";
import reactionRouter from "./reaction/index.js";

router.use("/studies", studyRouter);
router.use("/habits", habitRouter);
router.use("/reactions", reactionRouter);

export default router;
