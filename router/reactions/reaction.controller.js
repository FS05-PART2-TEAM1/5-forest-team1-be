import reactionService from "./reaction.service.js";

const fetchReactions = async (req, res) => {
  const studyId = req.params.studyId;

  try {
    const reactionList = await reactionService.fetchReactionsByStudyId(studyId);
    res.status(200).send({ studyId: studyId, reactionList });
  } catch (err) {
    console.log(`Error in reactionController.fetchReactions :: ${err.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const addReaction = (req, res) => {};
const modifyReaction = (req, res) => {};

const reactionController = {
  fetchReactions,
  addReaction,
  modifyReaction,
};

export default reactionController;
