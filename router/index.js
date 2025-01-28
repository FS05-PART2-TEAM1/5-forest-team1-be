import express from "express";
const router = express.Router();

import studyRouter from "./studies";

router.use("/studies", studyRouter);

export default router;
