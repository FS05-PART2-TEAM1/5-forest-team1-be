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
