import studyService from "./study.service.js";

/// 스터디 목록 조회
export const fetchAllStudies = async (req, res) => {
  const { page = 1, pageSize = 6, keyword, sortBy } = req.query;

  try {
    const result = await studyService.fetchAllStudies(
      Number(page),
      Number(pageSize),
      keyword,
      sortBy
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: "스터디 목록을 가져오는데 실패했습니다." });
  }
};

/// 스터디 만들기
export const addStudy = async (req, res) => {
  const {
    nickname,
    title,
    password,
    passwordConfirm,
    description,
    backgroundType,
    backgroundContent,
  } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).send({ error: "비밀번호가 일치하지 않습니다." });
  }

  try {
    const result = await studyService.addStudy(
      nickname,
      title,
      description,
      backgroundType,
      backgroundContent,
      password
    );
    res.status(201).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: "스터디 생성에 실패했습니다." });
  }
};

/// 스터디 비밀번호 확인
export const verifyPassword = async (req, res) => {
  const { studyId, password } = req.body;

  if (!studyId || !password) {
    return res.status(400).send({
      error: "스터디 ID와 비밀번호를 모두 입력해주세요.",
    });
  }

  try {
    const isValid = await studyService.verifyPassword(studyId, password);

    if (!isValid) {
      return res.status(401).send({ error: "비밀번호가 일치하지 않습니다." });
    }

    res.status(200).send({
      message: "비밀번호가 확인되었습니다.",
    });
  } catch (err) {
    if (err.message === "스터디를 찾을 수 없습니다.") {
      return res.status(401).send({
        error: err.message,
      });
    }
    res.status(500).send({
      error: "서버 오류가 발생했습니다.",
    });
  }
};

/// 스터디 수정
export const modifyStudy = async (req, res) => {
  const { studyId } = req.params;
  const { nickname, title, description, backgroundType, backgroundContent } =
    req.body;

  try {
    const result = await studyService.modifyStudy(
      studyId,
      nickname,
      title,
      description,
      backgroundType,
      backgroundContent,
      password
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

/// 스터디 상세 조회
export const fetchStudyDetail = async (req, res) => {
  const { studyId } = req.params;

  try {
    const result = await studyService.fetchStudyDetail(studyId);
    res.status(200).send(result);
  } catch (err) {
    if (err.message === "스터디를 찾을 수 없습니다.") {
      return res.status(404).send({ error: err.message });
    }
    console.error("스터디 상세 조회 중 오류 발생", err);
    res
      .status(500)
      .send({ error: "스터디 상세 정보를 가져오는데 실패했습니다." });
  }
};

/// 최근 조회한 스터디 목록 조회
export const fetchRecentStudies = async (req, res) => {
  const { studyIds } = req.query;

  try {
    // 쿼리 파라미터로 받은 문자열을 배열로 변환
    const studyIdArray = studyIds ? studyIds.split(",") : [];

    const result = await studyService.fetchRecentStudies(studyIdArray);
    res.status(200).send(result);
  } catch (err) {
    console.error("최근 조회한 스터디 목록 조회 중 오류 발생", err);
    res.status(500).send({
      error: "최근 조회한 스터디 목록을 가져오는데 실패했습니다.",
    });
  }
};
