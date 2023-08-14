import express from "express";
import * as resultController from "../controller/result.controller";
export const router = express.Router();

router.post("/", resultController.createResult);

router.get('/', resultController.getAllResult);
router.get('/:id/students', resultController.getStudents);
router.get('/:id/interviews', resultController.getInterviews);

router.put('/:id/', resultController.updateResult);
