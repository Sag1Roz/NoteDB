import express from "express";
import { connectToDateBase } from "./dataBase/init";
import { UserRouter } from "./routes/users";
import { AuthRouter } from "./routes/auth";
import { NoteRouter } from "./routes/note";
import authMiddleWere from "./middlewares/authMiddleWere";
import { AdminRouter } from "./routes/admin";
import adminMiddleWere from "./middlewares/adminMiddleWere";

const app = express();
app.use(express.json());

connectToDateBase();

app.listen(5000, () => {
  console.log("running on port 5000");
});

app.use("/users", authMiddleWere, UserRouter);
app.use("/auth", AuthRouter);
app.use("/notes", NoteRouter);
app.use("/admin", [authMiddleWere, adminMiddleWere], AdminRouter);
