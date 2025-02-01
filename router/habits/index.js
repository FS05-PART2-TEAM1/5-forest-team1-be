import express from 'express';
import {
  modifyDailyHabitById,
  // getHabits,
  // createHabit,
  modifyHabitById,
} from './habit.controller.js';

const router = express.Router();

// router.get('/', getHabits);
// router.post('/', createHabit);
router.patch('/:habitId', modifyHabitById);
router.patch('/:habitId/check/today', modifyDailyHabitById);

export default router;
