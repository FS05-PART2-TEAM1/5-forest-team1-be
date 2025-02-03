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

/// 스터디 수정 API
export const updateStudy = async (req, res) => {
  const { studyId } = req.params;
  const { name, description, backgroundIrl } = req.body;

  try {
    const result = await studyService.updateStudy(
      studyId,
      name,
      description,
      backgroundIrl
    );

    if (!result) {
      return res.status(404).send({ error: "스터디를 찾을 수 없습니다." });
    }
    const { password, ...studyWithoutPassword } = result;

    return res.status(200).send({
      message: "스터디가 성공적으로 수정되었습니다.",
      study: studyWithoutPassword,
    });
  } catch (err) {
    console.error("스터디 수정 중 오류 발생", err);
    return res.status(500).send({ error: "스터디 수정에 실패했습니다." });
  }
};
