import express from "express";
import { connectToDateBase } from "./dataBase/init";
import { UserRouter } from "./routes/users";
import { AuthRouter } from "./routes/auth";
import { NoteRouter } from "./routes/note";

const app = express();
app.use(express.json());

connectToDateBase();

app.listen(5000, () => {
  console.log("running on port 5000");
});

app.use("/all-users", UserRouter);
app.use("/auth", AuthRouter);
app.use("/notes", NoteRouter);
