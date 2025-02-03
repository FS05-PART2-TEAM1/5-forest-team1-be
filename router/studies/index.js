import express from "express";
import {
  fetchAllStudies,
  // createStudy,
  // getStudyById,
  // updateStudy,
  // deleteStudy,
  // getStudyPoints,
} from "./study.controller.js";
<<<<<<< Updated upstream
// import habitRouter from "../habits/index.js";
// import reactionRouter from "../reactions/index.js";
=======
import habitRouter from "../habits/index.js";
import reactionRouter from "../reactions/index.js";
>>>>>>> Stashed changes
// import pointRouter from "../points/index.js";

const router = express.Router();

router.get("/", fetchAllStudies);
// router.post("/", createStudy);
// router.get("/:studyId", getStudyById);
// router.patch("/:studyId", updateStudy);
// router.delete("/:studyId", deleteStudy);
// router.get("/:studyId/points", getStudyPoints);

<<<<<<< Updated upstream
// router.use("/:studyId/habits", habitRouter);
// router.use("/:studyId/reactions", reactionRouter);
=======
router.use("/:studyId/habits", habitRouter);
router.use("/:studyId/reactions", reactionRouter);
>>>>>>> Stashed changes
// router.use("/:studyId/points", pointRouter);

export default router;
