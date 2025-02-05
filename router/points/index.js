import express from "express";
import { addPoint } from "./point.controller.js";

const router = express.Router({ mergeParams: true });

// router.get("/:studyId/points", getStudyPoints);
router.post("/", addPoint);

export default router;
