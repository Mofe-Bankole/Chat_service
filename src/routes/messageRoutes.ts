import express , { Request, Response } from "express";
import { ApiError,} from "../utils";
import { AuthRequest, User } from "../middleware/middleware";
import { Message } from "../database/models/schema";
import { rabbitMQService } from "../services/RabbitMQService";
const router = express.Router();

router.post("chat/message" , async(req: Request<AuthRequest>, res: Response) => {
    try {
        const { receiverId, message } = req.body;
        const { _id, email, name } = req.body.user;

        validateReceiver(_id, receiverId);

        const newMessage = await Message.create({
            senderId: _id,
            receiverId,
            message,
        });

        await rabbitMQService.notifyReceiver(receiverId, message, name, email);

        return res.json({
            status: 200,
            message: "Message sent successfully!",
            data: newMessage,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
})


const validateReceiver = (senderId: string, receiverId: string) => {
    if (!receiverId) {
        throw new ApiError(404, "Receiver ID is required.");
    }

    if (senderId == receiverId) {
        throw new ApiError(400, "Sender and receiver cannot be the same.");
    }
};

router.post("/chat/get" , async (req : Request<AuthRequest>, res: Response) => {
    try {
        const { receiverId } = req.params;
        const senderId = req?.body.user.id;

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        });

        return res.json({
            status: 200,
            message: "Messages retrieved successfully!",
            data: messages,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
})


function handleMessageReceived(name: any, email: any, receiverId: any, message: any) {
    throw new Error("Function not implemented.");
}

export default router;