import mongoose, { Document } from "mongoose";

export interface ICourseScores extends Document {
  DSAFinalScore: number;
  WebDFinalScore: number;
  ReactFinalScore: number;
}

const scoreSchema = new mongoose.Schema<ICourseScores>({
  DSAFinalScore: {
    type: Number,
    required: true,
  },
  WebDFinalScore: {
    type: Number,
    required: true,
  },
  ReactFinalScore: {
    type: Number,
    required: true,
  },
});

const CourseScore = mongoose.model<ICourseScores>("CourseScore", scoreSchema);

export default CourseScore;
