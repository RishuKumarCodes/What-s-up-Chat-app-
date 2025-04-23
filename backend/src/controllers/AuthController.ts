import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config";

interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}

class AuthController {
  static async login(request: Request, response: Response) {
    console.log("jwt scret:", process.env.JWT_SECRET);
    try {
      const body: LoginPayloadType = request.body;
      let findUser = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }
      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };
      const secret = process.env.JWT_SECRET;
      if (secret) {
        const token = jwt.sign(JWTPayload, secret, {
          expiresIn: "365d",
        });
        return response.json({
          message: "Logged in successfully",
          user: {
            ...findUser,
            token: `bearer ${token}`,
          },
        });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Something went wrong, please try again!" });
    }
  }
}
export default AuthController;
