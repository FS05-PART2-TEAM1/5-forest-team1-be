import express from "express";
import {
  fetchHabits,
  addHabit,
  modifyDailyHabitById,
  modifyHabitById,
} from "./habit.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", fetchHabits);
router.post("/", addHabit);
router.patch("/:habitId", modifyHabitById);
router.post("/:habitId/check/today", modifyDailyHabitById);

export default router;
