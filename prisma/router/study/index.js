import express from "express";
import {
  getAllStudies,
  createStudy,
  getStudyById,
  updateStudy,
  deleteStudy,
  getStudyPoints,
} from "./study.controller.js";

const router = express.Router();

router.get("/", getAllStudies);
router.post("/", createStudy);
router.get("/:studyId", getStudyById);
router.patch("/:studyId", updateStudy);
router.delete("/:studyId", deleteStudy);
router.get("/:studyId/points", getStudyPoints);

export default router;
