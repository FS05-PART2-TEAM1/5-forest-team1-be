import express from "express";
import {
  fetchAllStudies,
  addStudy,
  verifyPassword,
  // getStudyById,

  // updateStudy,
  removeStudy,

  modifyStudy,
  // deleteStudy,

  // getStudyPoints,
} from "./study.controller.js";
import habitRouter from "../habits/index.js";
import reactionRouter from "../reactions/index.js";
// import pointRouter from "../points/index.js";

const router = express.Router();

router.get("/", fetchAllStudies);
router.post("/", addStudy);
// router.get("/:studyId", getStudyById);

// router.patch("/:studyId", updateStudy);
router.delete("/:studyId", removeStudy);

router.patch("/:studyId", modifyStudy);
// router.delete("/:studyId", deleteStudy);
router.post("/verify-password", verifyPassword);

// router.get("/:studyId/points", getStudyPoints);

router.use("/:studyId/habits", habitRouter);
router.use("/:studyId/reactions", reactionRouter);
// router.use("/:studyId/points", pointRouter);

export default router;
