import express from "express";
const router = express.Router();

import studyRouter from "./studies/index.js";

router.use("/studies", studyRouter);

export default router;
