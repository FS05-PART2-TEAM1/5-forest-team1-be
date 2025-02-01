import habitService from "./habit.service.js";

export const modifyHabitById = async (req, res) => {
    try {
        const habitId = req.params.habitId;
        const { name, deletedAt} = req.body; 
        if(deletedAt) await habitService.deleteHabitById(deletedAt, habitId);
        if(name) await habitService.updateHabitById(name, habitId);
         res.status(200).send({ message : "habit 수정 완료."})
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

export const checkHabitByIdAndDate = async (req, res) => {
    try {

    } catch (err) {

    }
}