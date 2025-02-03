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

  if (password !== passwordConfirm) {
    return res.status(400).send({ error: "비밀번호가 일치하지 않습니다." });
  }

  try {
    const result = await studyService.addStudy(
      name,
      description,
      backgroundImageUrl,
      password
    );
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: "스터디 생성에 실패했습니다." });
  }
};

export const verifyPassword = async (req, res) => {
  const { studyId, password } = req.body;

  if (!studyId || !password) {
    return res.status(400).send({
      error: "스터디 ID와 비밀번호를 모두 입력해주세요.",
    });
  }

  try {
    const isValid = await studyService.verifyPassword(studyId, password);
    res.status(200).send({
      isValid,
      message: "비밀번호가 확인되었습니다.",
    });
  } catch (err) {
    if (
      err.message === "비밀번호가 일치하지 않습니다." ||
      err.message === "스터디를 찾을 수 없습니다."
    ) {
      return res.status(401).send({
        error: err.message,
      });
    }
    res.status(500).send({
      error: "서버 오류가 발생했습니다.",
    });
  }
};
