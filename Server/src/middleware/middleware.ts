import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user.model";

interface IExtendedRequest extends Request {
  name?: string;
  user?: {
    email: string;
    role: string;
    userName: string | null;
  };
}

interface IResultAayo {
  id: string;
  iat: number;
  exp: number;
}

class Middleware {
  static isLoggedIn = async (
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "Please provide token" });
      return;
    }

    try {
      const resultaayo = jwt.verify(
        token,
        "this_is_a_secret_key"
      ) as IResultAayo;

      const userData = await User.findByPk(resultaayo.id);
      if (!userData) {
        res.status(401).json({ message: "User not found, invalid token" });
        return;
      }

      req.name = userData.username ?? "Unknown User";
      req.user = {
        email: userData.email,
        role: userData.role,
        userName: userData.username ?? null,
      };

      next(); // ✅ Only call next if all checks pass
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
  };
}

export default Middleware;
