import mongoose from "mongoose";
import { Document } from "mongoose";

enum studentStatus {
  placed = "placed",
  notPlaced = "not_placed",
}

export interface IStudent extends Document {
  name: string;
  college: string;
  status: studentStatus;
  batch: string;
  scores: mongoose.Types.ObjectId
}

const studentSchema = new mongoose.Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(studentStatus),
    default: studentStatus.notPlaced,
  },
  scores: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseScore',
      required: true
  }
});

const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
