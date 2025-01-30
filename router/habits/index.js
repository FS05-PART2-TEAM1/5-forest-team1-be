import express from "express";
import {
  getHabits,
  createHabit,
  deleteHabit,
  updateHabit,
  removeHabitById,
} from "./habit.controller.js";

const router = express.Router();

router.get("/", getHabits);
router.post("/", createHabit);
router.delete("/:habitId", removeHabitById);
router.patch("/:habitId", updateHabit);

export default router;
