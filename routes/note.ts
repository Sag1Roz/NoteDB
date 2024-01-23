import { Router } from "express";
import { noteSchema } from "../validations/note";
import { Note } from "../dataBase/Note";

const router = Router();

router.post("/info", async (req, res) => {
  try {
    const response = noteSchema.safeParse(req.body);
    if (!response.success) throw response.error;
    const { description, title } = response.data;
    const note = new Note({ title, description });
    await note.save();
    return res.json({ success: true, ...response.data });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

export { router as NoteRouter };
