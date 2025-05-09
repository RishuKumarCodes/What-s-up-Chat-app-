import jwt from "jsonwebtoken";
import {AuthUser} from "../custom-types"

import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err)
      return res.status(401).json({ status: 401, message: "Unauthorised" });
    req.user = user as AuthUser;

    next();
  });
};
export default authMiddleware