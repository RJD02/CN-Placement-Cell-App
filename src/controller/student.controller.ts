import asyncWrap from "../utils/asyncWrapper";
import { Request, Response } from "express";
import StudentDAL from "../repository/student.repo";
import Student, { IStudent } from "../models/student.model";
import IJsonResponse from "../utils/jsonResponse";
import CourseScore, { ICourseScores } from "../models/scores.model";
import CourseScoreDAL from "../repository/scores.repo";

const studentDAL = new StudentDAL(Student);
const courseScoreDAL = new CourseScoreDAL(CourseScore);

export const getAllStudents = asyncWrap(async (req: Request, res: Response) => {
  const students = await studentDAL.all();
  const jsonResponse: IJsonResponse = {
    message: "Successfully fetched all students",
    data: students,
  };
  res.status(200).json(jsonResponse);
});

export const createStudent = asyncWrap(async (req: Request, res: Response) => {
  const student: IStudent = req.body;
  const scores: ICourseScores = req.body.scores;
  const newCourseScores = await courseScoreDAL.create(scores);
  if (!newCourseScores)
    return res.status(400).json({ message: "Failed to create student" });
  student.scores = newCourseScores._id;
  const newStudent = await studentDAL.create(student);
  if (!newStudent)
    return res
      .status(400)
      .json({ message: "Failed to create student, please enter all details" });

  return res
    .status(200)
    .json({ student: newStudent, message: "Successfully created the student" });
});

export const getStudent = asyncWrap(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const student = await studentDAL.findById(studentId);
  if (!student) {
    const studentNotFoundJsonResponse: IJsonResponse = {
      message: "Student with that id doesn't exists",
    };
    return res.status(400).json(studentNotFoundJsonResponse);
  }
  const successJsonResponse: IJsonResponse = {
    message: "Successfully fetched the student",
    data: student,
  };
  return res.status(200).json(successJsonResponse);
});
