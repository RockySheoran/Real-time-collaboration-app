import { codeModel } from "../Model/codeModel.js";

export const setSet = async (req, res) => {
    try {
        const {  roomId,code } = req.body;
        // console.log(roomId,code)
        

        // Validate request body
        if (!code || !roomId) {
            return res.status(400).json({
                message: "Both code and roomId are required",
                success: false,
            });
        }

        // console.log("Received:", { code, roomId });

        // Check if the room exists
        const isRoom = await codeModel.findOne({ roomId });
        if (isRoom) {
            // Update existing room
            await codeModel.findByIdAndUpdate(isRoom._id, { code });
            return res.status(200).json({
                message: "Code updated successfully",
                success: true,
            });
        }

        // If room doesn't exist, create a new record
        const newRoom = new codeModel({ code, roomId });
        await newRoom.save();

        return res.status(201).json({
            message: "New room created and code saved",
            success: true,
        });
    } catch (error) {
        console.error("Error in setSet:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const getCode = async (req, res) => {
    try {
        const { roomId } = req.query;
        // console.log(roomId)

        // Validate request body
        if (!roomId) {
            return res.status(400).json({
                message: "roomId is required",
                success: false,
            });
        }

        // Find the room by roomId
        const find = await codeModel.findOne({ roomId });
        if (!find) {
            return res.status(404).json({
                message: "Room not found",
                success: false,
            });
        }

        // console.log("Found room:", find);

        return res.status(200).json({
            message: "Room found",
            success: true,
            data: find,
        });
    } catch (error) {
        console.error("Error in getCode:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
