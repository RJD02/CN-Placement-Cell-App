import { Request, Response } from "express";
import asyncWrap from "../utils/asyncWrapper";
import InterviewDAL from "../repository/interview.repo";
import Interview, { IInterview } from "../models/interview.model";
import IJsonResponse from "../utils/jsonResponse";

const interviewDAL = new InterviewDAL(Interview);

export const getAllInterviews = asyncWrap(
  async (req: Request, res: Response) => {
    const interviews = await interviewDAL.all();
    return res
      .status(200)
      .json({
        message: "Successfully fetched all interviews",
        data: interviews,
      });
  }
);

export const createInterview = asyncWrap(
  async (req: Request, res: Response) => {
    const interview: IInterview = req.body;
    const newInterview = await interviewDAL.create(interview);
    const failedJsonResponse: IJsonResponse = {
      message: "Failed to create the interview, please enter all details",
    };
    if (!newInterview) return res.status(400).json(failedJsonResponse);
    const successJsonResponse: IJsonResponse = {
      message: "Successfully created a new interview",
      data: newInterview,
    };
    return res.status(200).json(successJsonResponse);
  }
);

export const getInterview = asyncWrap(async (req: Request, res: Response) => {
  const interviewId = req.params.id;
  const interview = await interviewDAL.findById(interviewId);
  if (!interview) {
    const failedJsonResponse: IJsonResponse = {
      message: "No interview with that id exists",
    };
    return res.status(400).json(failedJsonResponse);
  }
  const successJsonResponse: IJsonResponse = {
    message: "Successfully fetched the interview",
    data: interview,
  };
  return res.status(200).json(successJsonResponse);
});
