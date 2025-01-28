import habitService from "./habit.service";

export const deleteHabit = async (req, res) => {
    try {
        await habitService.deleteHabit(req.query.id);
        res.status(200).send({message : "habit 삭제 완료!"});
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
