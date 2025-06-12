import { Request, Response } from "express";
import prisma from "../config/db.config";

class AllUsers {
  static async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json({ data: users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
export default AllUsers;
