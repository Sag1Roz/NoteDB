import { Router } from "express";
import { noteSchema } from "../validations/note";
import { Note } from "../dataBase/Note";
import authMiddleWere from "../middlewares/authMiddleWere";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allNotes = await Note.find();
    return res.json({ success: true, ...allNotes });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

router.post("/new", authMiddleWere, async (req, res) => {
  try {
    const response = noteSchema.safeParse(req.body);
    if (!response.success) throw response.error;
    const { description, title } = response.data;

    if (!req.currentUser) throw "You must login to create a note";

    const note = new Note({
      title,
      description,
      createdBy: req.currentUser?.id,
    });
    await note.save();
    return res.json({ success: true, ...response.data });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

router.get("/my-notes", authMiddleWere, async (req, res) => {
  try {
    if (!req.currentUser) throw "You must login to create a note";
    const notes = await Note.find({ createdBy: req.currentUser.id });
    return res.json({ success: true, ...notes });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

router.delete("/deleteAllNotes", async (req, res) => {
  try {
    await Note.deleteMany();
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

export { router as NoteRouter };
