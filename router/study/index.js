import express from "express";
import {
  getAllStudies,
  createStudy,
  getStudyById,
  updateStudy,
  deleteStudy,
  getStudyPoints,
} from "./study.controller.js";
import habitRouter from "../habit";
import reactionRouter from "../reaction";
import pointRouter from "../point";

const router = express.Router();

router.get("/", getAllStudies);
router.post("/", createStudy);
router.get("/:studyId", getStudyById);
router.patch("/:studyId", updateStudy);
router.delete("/:studyId", deleteStudy);
router.get("/:studyId/points", getStudyPoints);

router.use("/:studyId/habits", habitRouter);
router.use("/:studyId/reactions", reactionRouter);
router.use("/:studyId/points", pointRouter);

export default router;
