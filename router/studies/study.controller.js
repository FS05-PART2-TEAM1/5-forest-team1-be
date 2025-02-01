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

export const addStudy = async (req, res) => {
  const { name, password, passwordConfirm, description, backgroundImageUrl } =
    req.body;

  try {
    const result = await studyService.addStudy(
      name,
      description,
      backgroundImageUrl,
      password,
      passwordConfirm
    );
    res.status(201).send(result); // 201 Created 상태 코드 사용
  } catch (err) {
    if (err.message === "비밀번호가 일치하지 않습니다.") {
      return res.status(400).send({ error: err.message });
    }
    res.status(500).send({ error: "스터디 생성에 실패했습니다." });
  }
};
