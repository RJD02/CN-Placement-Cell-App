import express from "express";
import * as interviewController from '../controller/interview.controller'
import { authenticateToken } from "../middleware/authenticate.middleware";
export const router = express.Router();

router.use(authenticateToken);

router.get('/', interviewController.getAllInterviews);

router.post('/',  interviewController.createInterview);
