import { Router } from "express";
import { Note } from "../dataBase/Note";

const router = Router();

router.delete("/", async (req, res) => {
  try {
    await Note.deleteMany({ createdBy: req.currentUser?.id });
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

export { router as AdminRouter };
