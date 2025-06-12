import prisma from "../config/db.config";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
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
  res.json(messages);
}
