import express from "express";
import * as studentController from "../controller/student.controller";
import { authenticateToken } from "../middleware/authenticate.middleware";

export const router = express.Router();

// protect this route
router.use(authenticateToken);

// get all students
router.get("/", studentController.getAllStudents);

// create new student
router.post("/", studentController.createStudent);

// fetch a student with id
router.get("/:id", studentController.getStudent);

router.put('/:id', studentController.updateStudent);
