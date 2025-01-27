import express from "express";
const router = express.Router();
import reactionController from "./reaction.controller";

router.get("/:studyId/reactions", reactionController.getReactions);
router.post("/:studyId/reactions", reactionController.createReaction);
router.patch("/reactions/:reactionId", reactionController.updateReaction);

export default router;
