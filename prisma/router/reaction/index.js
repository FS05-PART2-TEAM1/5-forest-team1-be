import express from "express";
import {
  getReactions,
  createReaction,
  updateReaction,
} from "./reaction.controller.js";

const router = express.Router();

router.get("/:studyId/reactions", getReactions);
router.post("/:studyId/reactions", createReaction);
router.patch("/reactions/:reactionId", updateReaction);

export default router;
