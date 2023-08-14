import express from "express";
import * as studentController from "../controller/student.controller";
import { authenticateToken } from "../middleware/authenticate.middleware";

export const router = express.Router();

router.use(authenticateToken);

router.get("/", studentController.getAllStudents);

router.post("/", studentController.createStudent);
