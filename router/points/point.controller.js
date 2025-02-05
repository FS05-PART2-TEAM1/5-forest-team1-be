import studyService from "../studies/study.service.js";
import pointService from "./point.service.js";

export const addPoint = async (req, res) => {
  const { studyId } = req.params;
  try {
    if (!(await studyService.existStudyById(studyId))) {
      return res
        .status(400)
        .send({ message: "studyId에 해당하는 스터디가 없습니다." });
    }
    const pointInfo = await pointService.addPoint(studyId, req.body);
    res.status(200).send(pointInfo);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "알 수 없는 에러 발생" });
  }
};
