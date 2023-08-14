import express from "express";
import * as resultController from "../controller/result.controller";
import { authenticateToken } from "../middleware/authenticate.middleware";
export const router = express.Router();

router.use(authenticateToken);

router.post("/", resultController.createResult);

router.get('/', resultController.getAllResult);
router.get('/:id/students', resultController.getStudents);
router.get('/:id/interviews', resultController.getInterviews);

router.put('/:id/', resultController.updateResult);
