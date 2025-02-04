import habitService from "./habit.service.js";

export const fetchHabits = async (req, res) => {
  const { studyId } = req.params;
  try {
    const habitList = await habitService.fetchHabits(studyId);
    res.status(200).send({ studyId, habitList });
  } catch (err) {
    console.error(err);
    res.status(500).send("습관 목록을 가져오는 중 오류가 발생했습니다.");
  }
};

export const addHabit = async (req, res) => {
  const { studyId, name } = req.body;

  if (!studyId || !name) {
    return res
      .status(400)
      .send({ error: "studyId와 name을 입력하지 않았습니다." });
  }

  try {
    const newHabit = await habitService.addHabit(studyId, name);
    res.status(201).send(newHabit);
  } catch (err) {
    console.error(err);
    res.status(500).send("습관 추가 중 오류가 발생했습니다.");
  }
};

export const modifyHabitById = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const updatedHabit = await habitService.modifyHabitById(habitId, req.body);
    res.status(200).send(updatedHabit);
  } catch (err) {
    if (err.code === "P2025") {
      res
        .status(400)
        .send({ message: "아이디에 해당하는 habit이 존재하지 않습니다." });
    } else {
      console.log(err);
      res.status(500).send({ message: "예기치 못한 에러 발생!" });
    }
  }
};

export const modifyDailyHabitById = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const status = req.body.status;
    if (!(status === true || status === false))
      return res.status(400).send({ message: "status 형식 에러" });
    const dailyHabit = await habitService.modifyDailyHabitCheck(habitId, status);
    res.status(200).send(dailyHabit);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "예기치 못한 에러 발생!" });
  }
};

export const fetchHabitCheck = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const {start, end} = req.query;
    const habitChecks = await habitService.fetchHabitCheck(habitId, start, end);
    res.status(200).send(habitChecks);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "예기치 못한 에러 발생!" });
  }
}