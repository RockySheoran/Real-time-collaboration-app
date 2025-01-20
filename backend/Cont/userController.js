import { codeModel } from "../Model/codeModel";


export const setSet = async (req, res) => {
    try {
        const { code, roomId } = req.body;

        const isRoom = await codeModel.findOne({ roomId });
        if (isRoom) {
            codeModel.findByIdUpdate({ _id: isRoom._id, code: code })
            return res.status(200).json({
                message: "add code in backend",
                success: true,
            })
        }
        await codeModel.findByIdAndUpdate(
            isRoom._id,
            { code }
        );

        return res.status(200).json({
            message: "add code in backend",
            success: true,
        })


    } catch (error) {
        console.log(error)
    }

}

export const getCode = async (req, res) => {
    try {
        const { roomId } = req.body;
        const find = await 
    } catch (error) {

    }





}