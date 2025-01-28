import express from "express";
const router = express.Router();

import studyRouter from "./study";

router.use("/studies", studyRouter);

export default router;
