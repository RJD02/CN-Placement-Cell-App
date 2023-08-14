import mongoose, { Schema, Document } from "mongoose";

enum InterviewStatus {
  PASS = "PASS",
  FAIL = "FAIL",
  ON_HOLD = "ON_HOLD",
  DIDNT_ATTEMPT = "DIDNT_ATTEMPT",
}

export interface IInterviewResultRecord extends Document {
  interview: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  result: InterviewStatus;
}

const resultSchema = new mongoose.Schema<IInterviewResultRecord>({
  interview: {
    type: Schema.Types.ObjectId,
    ref: "Interview",
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  result: {
    type: String,
    enum: Object.values(InterviewStatus),
    required: true,
    default: InterviewStatus.DIDNT_ATTEMPT,
  },
});

resultSchema.index({ student: 1, interview: 1 }, { unique: true });

const InterviewResult = mongoose.model<IInterviewResultRecord>(
  "InterviewResult",
  resultSchema
);

export default InterviewResult;
