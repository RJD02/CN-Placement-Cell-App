import { Request, Response } from "express";
import asyncWrap from "../utils/asyncWrapper";
import InterviewResultDAL from "../repository/result.repo";
import InterviewResult, {
  IInterviewResultRecord,
} from "../models/result.model";
import IJsonResponse from "../utils/jsonResponse";
const resultDAL = new InterviewResultDAL(InterviewResult);

export const createResult = asyncWrap(async (req: Request, res: Response) => {
  const resultObj: IInterviewResultRecord = req.body;
  const result = await resultDAL.create(resultObj);
  if (!result) return res.status(400).json({ message: "Something gone wrong" });
  await result.populate("interview student");
  const jsonResponse: IJsonResponse = {
    message: "Successfully created new result",
    data: result,
  };
  return res.status(200).json(jsonResponse);
});

export const getAllResult = asyncWrap(async (req: Request, res: Response) => {
  const results = await resultDAL.all();
  const jsonResponse: IJsonResponse = {
    message: "Successfully fetched all results",
    data: results,
  };
  return res.status(200).json(jsonResponse);
});

export const getStudents = asyncWrap(async (req: Request, res: Response) => {
  const interviewId = req.params.id;
  const interviewResult = await resultDAL.findAndPopulate(
    { interview: interviewId },
    { path: "student" }
  );
  if (!interviewResult) {
    const noInterviewFoundJsonResponse: IJsonResponse = {
      message: "No interview with that id found",
    };
    return res.status(400).json(noInterviewFoundJsonResponse);
  }

  const studentsListJsonResponse: IJsonResponse = {
    message: "Successfully fetched students",
    data: interviewResult,
  };
  res.status(200).json(studentsListJsonResponse);
});

export const getInterviews = asyncWrap(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const studentResult = await resultDAL.findAndPopulate(
    { student: studentId },
    { path: "interview" }
  );
  if (!studentResult) {
    const noStudentFoundJsonResponse: IJsonResponse = {
      message: "No student with that id found",
    };
    return res.status(400).json(noStudentFoundJsonResponse);
  }
  const interviewsListJsonResponse: IJsonResponse = {
    message: "Successfully fetched interviews",
    data: studentResult,
  };
  res.status(200).json(interviewsListJsonResponse);
});

export const updateResult = asyncWrap(async (req: Request, res: Response) => {
  const updatedResult = req.body.result;
  const resultId = req.params.id;
  const result = await resultDAL.findById(resultId);
  if (!result) {
    const noResultFoundJsonResponse: IJsonResponse = {
      message: "No result found with that id",
    };
    return res.status(400).json(noResultFoundJsonResponse);
  }
  result.result = updatedResult;
  await result.save();
  const successUpdateJsonResponse: IJsonResponse = {
    message: "Result updated",
    data: result,
  };
  return res.status(200).json(successUpdateJsonResponse);
});
