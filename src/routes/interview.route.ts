import express from "express";
import * as interviewController from '../controller/interview.controller'
import { authenticateToken } from "../middleware/authenticate.middleware";
export const router = express.Router();

router.get('/', interviewController.getAllInterviews);

router.post('/', authenticateToken,  interviewController.createInterview);
