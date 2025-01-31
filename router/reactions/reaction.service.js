import prisma from "../../prismaClient.js";

const fetchReactionsByStudyId = async (studyId) => {
  return await prisma.reaction.findMany({ where: { studyId } });
};
const addReaction = () => {};
const modifyReaction = () => {};

const reactionService = {
  fetchReactionsByStudyId,
  addReaction,
  modifyReaction,
};

export default reactionService;
