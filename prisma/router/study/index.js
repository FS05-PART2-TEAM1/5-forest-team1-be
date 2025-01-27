import express from "express";
const router = express.Router();
import studyController from "./study.controller";

router.get("/", studyController.getAllStudies);
router.post("/", studyController.createStudy);
router.get("/:studyId", studyController.getStudyById);
router.patch("/:studyId", studyController.updateStudy);
router.delete("/:studyId", studyController.deleteStudy);
router.get("/:studyId/points", studyController.getStudyPoints);

export default router;
