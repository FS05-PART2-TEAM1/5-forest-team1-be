import express from "express";
import reactionController from "./reaction.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", reactionController.fetchReactions);
router.post("/", reactionController.addReaction);
router.patch("/:reactionId", reactionController.modifyReaction);

export default router;
