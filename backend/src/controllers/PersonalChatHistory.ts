import prisma from "../config/db.config";
import { Request, Response } from "express";

export default async function PersonalChatHistory(req: Request, res: Response) {
  console.log("the query recieved is ", req.query);
  const { user1, user2 } = req.query;
  if (!user1 || !user2) return res.status(400).json({ error: "missing Ids" });

  const messages = await prisma.personalMessage.findMany({
    where: {
      OR: [
        { senderId: Number(user1), receiverId: Number(user2) },
        { senderId: Number(user2), receiverId: Number(user1) },
      ],
    },
    orderBy: { createdAt: "asc" },
  });
  res.json({ data: messages });
}
