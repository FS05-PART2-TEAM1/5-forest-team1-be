import habitService from "./habit.service.js";
import { startOfWeek, endOfWeek } from "date-fns";

export const fetchHabits = async (req, res) => {
  const { studyId } = req.params;
  let { start, end, sortBy } = req.query;

  // 날짜와 정렬 기준 처리 함수 호출
  const { startDate, endDate, sortOrder } = handleQueryParams(
    start,
    end,
    sortBy
  );

  try {
    const habitList = await habitService.fetchHabits(
      studyId,
      startDate,
      endDate,
      sortOrder
    );
    res.status(200).send({ studyId, habitList });
  } catch (err) {
    handleError(err, res);
  }
};

// 쿼리 파라미터 처리
const handleQueryParams = (start, end, sortBy) => {
  const startDate = start
    ? new Date(start).toISOString()
    : startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString(); // 이번 주 월요일 00:00:00
  const endDate = end
    ? new Date(end).toISOString()
    : endOfWeek(new Date(), { weekStartsOn: 1 }).toISOString(); // 이번 주 일요일 23:59:59
  const sortOrder = sortBy || "date"; // 기본 정렬 기준: 'date'  월요일 -> 일요일

  return { startDate, endDate, sortOrder };
};

// 에러 처리
const handleError = (err, res) => {
  console.error("에러 발생:", err);
  res.status(500).send({
    message: "습관 목록을 가져오는 중 오류가 발생했습니다.",
    error: err.message,
  });
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

export const modifyHabits = async (req, res) => {
  try {
    const updatedHabits = await habitService.modifyHabits(req.body);
    res.status(200).send(updatedHabits);
  } catch (err) {
      console.log(err);
      res.status(500).send({ message: "예기치 못한 에러 발생!" });
  }
};

export const modifyDailyHabitById = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const {status, start, end} = req.body;
    if (!(status === true || status === false || !start || !end))
      return res.status(400).send({ message: "body 형식 에러" });
    const dailyHabit = await habitService.modifyDailyHabitCheck(
      habitId,
      status,
      start,
      end
    );
    res.status(200).send(dailyHabit);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "예기치 못한 에러 발생!" });
  }
};

export const fetchHabitCheck = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const { start, end } = req.query;
    const habitChecks = await habitService.fetchHabitCheck(habitId, start, end);
    res.status(200).send(habitChecks);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "예기치 못한 에러 발생!" });
  }
};
