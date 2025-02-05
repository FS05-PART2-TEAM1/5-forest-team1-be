import express from "express";
import {
  fetchAllStudies,
  addStudy,
  verifyPassword,
  modifyStudy,
  removeStudy,
} from "./study.controller.js";

import habitRouter from "../habits/index.js";
import reactionRouter from "../reactions/index.js";
// import pointRouter from "../points/index.js";

const router = express.Router();

router.get("/", fetchAllStudies);
router.post("/", addStudy);
router.patch("/:studyId", modifyStudy);
router.delete("/:studyId", removeStudy);
router.post("/verify-password", verifyPassword);

router.use("/:studyId/habits", habitRouter);
router.use("/:studyId/reactions", reactionRouter);
// router.use("/:studyId/points", pointRouter);

export default router;
