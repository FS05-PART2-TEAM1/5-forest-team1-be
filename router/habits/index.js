import express from 'express';
import {
  getHabits,
  createHabit,
  modifyHabitById,
} from './habit.controller.js';

const router = express.Router();

router.get('/', getHabits);
router.post('/', createHabit);
router.patch('/:habitId', modifyHabitById);

export default router;
