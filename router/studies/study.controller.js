import studyService from "./study.service.js";

export const fetchAllStudies = async (req, res) => {
  const { page, pageSize, keyword, sortBy } = req.query;

  try {
    const result = await studyService.fetchAllStudies(
      page,
      pageSize,
      keyword,
      sortBy
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: "스터디 목록을 가져오는데 실패했습니다." });
  }
};

/// 스터디 삭제
export const removeStudy = async (req, res) => {
  const { studyId } = req.params;

  try {
    const deleted = await studyService.removeStudy(studyId);
    return res.status(200).send({
      message: "스터디가 삭제되었습니다.",
      study: deleted,
    });
  } catch (err) {
    console.error("스터디 삭제 중 오류 발생", err);
    return res
      .status(500)
      .send({ error: "스터디 삭제 중 오류가 발생했습니다." });
  }
};
