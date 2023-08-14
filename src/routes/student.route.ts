import express from "express";
import * as studentController from "../controller/student.controller";

export const router = express.Router();

router.get("/", studentController.getAllStudents);

router.post("/", studentController.createStudent);
