import prisma from "../../prismaClient.js";

const fetchReactionsByStudyId = async (studyId) => {
  return await prisma.reaction.findMany({ where: { studyId } });
};

const addReaction = async (data) => {
  return await prisma.reaction.create({
    data,
  });
};

const modifyReaction = () => {};

const reactionService = {
  fetchReactionsByStudyId,
  addReaction,
  modifyReaction,
};

export default reactionService;
