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
    return res.status(400).send({ error: "studyId와 name을 입력하지 않았습니다." });
  }

  try {
    const newHabit = await habitService.addHabit(studyId, name); 
    res.status(201).send(newHabit); 
  } catch (err) {
    console.error(err);
    res.status(500).send("습관 추가 중 오류가 발생했습니다.");
  }
};