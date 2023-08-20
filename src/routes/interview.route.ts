import express from "express";
import * as interviewController from "../controller/interview.controller";
import { authenticateToken } from "../middleware/authenticate.middleware";
export const router = express.Router();

router.use(authenticateToken);

// get all interviews
router.get("/", interviewController.getAllInterviews);

// create a new interview
router.post("/", interviewController.createInterview);

// fetch a interview with given id
router.get("/:id", interviewController.getInterview);
