import { Router } from "express";
import { userUpdateSchema } from "../validations/users";
import { User } from "../dataBase/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const user = req.currentUser;
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

router.put("/", async (req, res) => {
  try {
    const response = userUpdateSchema.safeParse(req.body);
    if (!response.success) throw response.error;
    const { email, name } = response.data;

    if (!req.currentUser) throw "You must login";

    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw `Email ${email} is already registered please provide different one`;

    await User.findOneAndUpdate(
      { email: req.currentUser.email },
      { email, name }
    );
    const token = jwt.sign(email, process.env.JTW_SECRET!);

    return res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const allUsers = await User.find().select([
      "name",
      "email",
      "createdAt",
      "isAdmin",
    ]);
    return res.json({ success: true, ...allUsers });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

export { router as UserRouter };
