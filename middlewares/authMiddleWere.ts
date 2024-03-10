import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../dataBase/User";
import { IUser } from "../models/User";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;
    if (!token) throw "token is required";

    const email = jwt.decode(token.toString());
    if (!email) throw "error parsing token";

    const user = await User.findOne({ email }).select([
      "name",
      "email",
      "createdAt",
      "isAdmin",
    ]);
    if (!user) throw "Unauthorized";

    req.currentUser = {
      id: user._id,
      name: user.name,
      createdAt: user.createdAt,
      email: user.email,
      isAdmin: user.isAdmin,
    } as IUser;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, error });
  }
};
