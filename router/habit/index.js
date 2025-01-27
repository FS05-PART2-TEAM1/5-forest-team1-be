import express from "express";
import {
  getHabits,
  createHabit,
  deleteHabit,
  updateHabit,
} from "./habit.controller.js";

const router = express.Router();

router.get("/:studyId/habits", getHabits);
router.post("/:studyId/habits", createHabit);
router.delete("/habits/:habitId", deleteHabit);
router.patch("/habits/:habitId", updateHabit);

export default router;
