import db from "./config/db.config";
import express from "express";
import { router as interviewRouter } from "./routes/interview.route";
import { router as studentRouter } from "./routes/student.route";
import { router as resultRouter } from "./routes/result.route";
import {router as userRouter} from './routes/user.route'
import User from "./models/user.model";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded());

db();

app.use("/interview", interviewRouter);
app.use("/student", studentRouter);
app.use("/result", resultRouter);
app.use("/user", userRouter);

const PORT = 8000;
app.listen(PORT, () => console.log("Listening on port", PORT));
