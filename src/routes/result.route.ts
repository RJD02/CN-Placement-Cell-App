import express from "express";
import * as resultController from "../controller/result.controller";
import { authenticateToken } from "../middleware/authenticate.middleware";
export const router = express.Router();

router.use(authenticateToken);

// post to create new result
router.post("/", resultController.createResult);

// get all results
router.get("/", resultController.getAllResult);

// fetch all students of interview with id
router.get("/:id/students", resultController.getStudents);

// fetch all interview of student with id
router.get("/:id/interviews", resultController.getInterviews);

// update a result with id
router.put("/:id/", resultController.updateResult);

router.get("/download", resultController.downloadResultReport);
