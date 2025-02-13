import express from "express";
import {
  fetchAllStudies,
  addStudy,
  verifyPassword,
  modifyStudy,
  removeStudy,
  fetchStudyDetail,
  fetchRecentStudies,
} from "./study.controller.js";

import habitRouter from "../habits/index.js";
import reactionRouter from "../reactions/index.js";
import pointRouter from "../points/index.js";

const router = express.Router();

router.get("/", fetchAllStudies);
router.post("/", addStudy);
router.get("/recent", fetchRecentStudies);
router.post("/verify-password", verifyPassword);
router.get("/:studyId", fetchStudyDetail);
router.patch("/:studyId", modifyStudy);
router.delete("/:studyId", removeStudy);

router.use("/:studyId/habits", habitRouter);
router.use("/:studyId/reactions", reactionRouter);
router.use("/:studyId/points", pointRouter);

export default router;
