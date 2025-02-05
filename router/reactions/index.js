import express from "express";
import reactionController from "./reaction.controller.js";

const router = express.Router({ mergeParams: true });

/**
 * @openapi
 * '/api/studies/{studyId}/reactions':
 *  get:
 *     tags:
 *     - Reaction (응원 이모지)
 *     summary: 응원 이모지 조회 API
 *     parameters:
 *      - name: studyId
 *        in: path
 *        description: Study Id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ReactionResponse"
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/", reactionController.fetchReactions);
/**
 * @openapi
 * '/api/studies/{studyId}/reactions':
 *  post:
 *     tags:
 *     - Reaction (응원 이모지)
 *     summary: 응원 이모지 남기기 API
 *     parameters:
 *      - name: studyId
 *        in: path
 *        description: Study Id
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       description: 이모지 JSON 데이터
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              emoji:
 *                type: string
 *     responses:
 *      200:
 *        description: Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ReactionResponse"
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/", reactionController.addReaction);
/**
 * @openapi
 * '/api/studies/{studyId}/reactions/{reactionId}':
 *  patch:
 *     tags:
 *     - Reaction (응원 이모지)
 *     summary: 응원 이모지 카운터 증가 API
 *     parameters:
 *      - name: studyId
 *        in: path
 *        description: Study Id
 *        required: true
 *        schema:
 *          type: string
 *      - name: reactionId
 *        in: path
 *        description: Reaction Id
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       description: 이모지 JSON 데이터
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              counts:
 *                type: integer
 *     responses:
 *      200:
 *        description: Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ReactionResponse"
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.patch("/:reactionId", reactionController.modifyReaction);

export default router;
