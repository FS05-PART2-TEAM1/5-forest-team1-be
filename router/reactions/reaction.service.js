import prisma from "../../prismaClient.js";

const fetchReactionsByStudyId = async (studyId) => {
  return await prisma.reaction.findMany({ where: { studyId } });
};

const addReaction = async (data) => {
  return await prisma.reaction.create({
    data,
  });
};

const modifyReactionById = async ({ reactionId, counts }) => {
  return await prisma.reaction.update({
    where: { id: reactionId },
    data: { counts },
  });
};

const reactionService = {
  fetchReactionsByStudyId,
  addReaction,
  modifyReactionById,
};

export default reactionService;
