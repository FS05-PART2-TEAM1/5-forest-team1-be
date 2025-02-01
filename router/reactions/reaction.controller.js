import reactionService from "./reaction.service.js";
import studyService from "../studies/study.service.js";

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

const addReaction = async (req, res) => {
  const studyId = req.params.studyId;
  const { emoji } = req.body;

  try {
    if (!(await studyService.existStudyById(studyId))) {
      return res
        .status(400)
        .send({ message: `유효하지 않은 "study id"입니다.` });
    }

    const reaction = await reactionService.addReaction({ studyId, emoji });
    res.status(200).send({ studyId: studyId, reaction });
  } catch (err) {
    console.log(`Error in reactionController.addReaction :: ${err.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const modifyReaction = async (req, res) => {
  const { studyId, reactionId } = req.params;
  const { counts } = req.body;

  try {
    const reaction = await reactionService.modifyReactionById({
      reactionId,
      counts,
    });
    res.status(200).send({ studyId: studyId, reaction });
  } catch (err) {
    console.log(`Error in reactionController.modifyReaction :: ${err.message}`);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const reactionController = {
  fetchReactions,
  addReaction,
  modifyReaction,
};

export default reactionController;
