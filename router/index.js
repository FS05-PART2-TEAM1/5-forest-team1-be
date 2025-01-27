import express from "express";
const router = express.Router();

import studyRouter from "./study";
import habitRouter from "./habit";
import reactionRouter from "./reaction";

router.use("/studies", studyRouter);
router.use("/habits", habitRouter);
router.use("/reactions", reactionRouter);

export default router;
