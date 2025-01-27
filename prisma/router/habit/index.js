import express from "express";
const router = express.Router();
import habitController from "./habit.controller";

router.get("/:studyId/habits", habitController.getHabits);
router.post("/:studyId/habits", habitController.createHabit);
router.delete("/habits/:habitId", habitController.deleteHabit);
router.patch("/habits/:habitId", habitController.updateHabit);

export default router;
