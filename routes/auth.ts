import { Router } from "express";
import { loginSchema, registerSchema } from "../validations/auth";
import { User } from "../dataBase/user";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const response = loginSchema.safeParse(req.body);
    if (!response.success) throw response.error;
    const { email, password } = response.data;

    const user = await User.findOne({ email });
    if (user === null) throw "Incorrect email or password";

    const isValid = await bcrypt.compare(password, user.password!);
    if (!isValid) throw "Incorrect email or password";

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, error });
  }
});
router.post("/register", async (req, res) => {
  try {
    const response = registerSchema.safeParse(req.body);
    if (!response.success) throw response.error;
    const { email, name, password: rawPassword } = response.data;

    const existsUser = await User.findOne({ email });
    if (existsUser !== null) throw "this email is already register";

    const password = await bcrypt.hash(rawPassword, 10);

    const user = new User({ email, name, password });
    await user.save();
    return res.json({ success: true, ...response.data });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

export { router as AuthRouter };
