import { NextFunction, Request, Response } from "express";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.currentUser) throw "You need to login";

    if (!req.currentUser.isAdmin) throw "You need to be admin to get in";

    next();
  } catch (error) {
    return res.status(403).json({ success: false, error });
  }
};
