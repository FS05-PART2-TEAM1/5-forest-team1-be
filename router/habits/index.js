import express from "express";

import {
  fetchHabits,
  addHabit,
  //   deleteHabit,
  //modifyHabitById,
} from "./habit.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", fetchHabits);
router.post("/", addHabit);

// router.patch("/:habitId", modifyHabitById);

// router.post("/", createHabit);
// router.delete("/:habitId", deleteHabit);
// router.patch("/:habitId", updateHabit);

export default router;
