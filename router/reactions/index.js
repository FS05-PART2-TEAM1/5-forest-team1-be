import express from "express";
import {
  fetchReactions,
  addReaction,
  modifyReaction,
} from "./reaction.controller.js";

const router = express.Router();

router.get("/", fetchReactions);
router.post("/", addReaction);
router.patch("/:reactionId", modifyReaction);

export default router;
