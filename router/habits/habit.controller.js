import habitService from "./habit.service.js";

export const modifyHabitById = async (req, res) => {
    try {
        const habitId = req.params.habitId;
        const updatedHabit = await habitService.modifyHabitById(habitId, req.body);
         res.status(200).send(updatedHabit);
    } catch (err) {
        if(err.code === 'P2025') {
            res.status(400).send({ message : "아이디에 해당하는 habit이 존재하지 않습니다."});
        }
        else {
            console.log(err);
            res.status(500).send({ message : "예기치 못한 에러 발생!"});
        }
    }
}