import express from "express";
import prisma from "../../prismaClient.js"; // Adjust path as necessary

// import {
//   getHabits,
//   createHabit,
//   deleteHabit,
//   updateHabit,
// } from "./habit.controller.js";

const router = express.Router();

//router.get("/:studyId/habits", getHabits);
router.get("/", async (req, res) => {
  const { studyId } = req.params;
  try {
    // Fetch habits associated with the studyId
    const habitList = await prisma.habit.findMany({
      where: {
        studyId,
      },
    });

    res.status(200).send({ studyId: studyId, habitList });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching habits.");
  }
});

// router.post("/", createHabit);
// router.delete("/:habitId", deleteHabit);
// router.patch("/:habitId", updateHabit);

export default router;
