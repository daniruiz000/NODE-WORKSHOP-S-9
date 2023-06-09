import { Author } from "../entities/author-entity"
import { verifyToken } from "../../utils/token";

import {
  type Response,
  type NextFunction,
} from "express";

export const isAuth = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new Error("No tienes autorización para realizar esta operación");
    }

    const decodedInfo = verifyToken(token);
    const user = await Author.findOne({ email: decodedInfo.email }).select("+password");
    if (!user) {
      throw new Error("No tienes autorización para realizar esta operación");
    }

    req.author = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
  }
};
