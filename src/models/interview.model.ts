import mongoose, { Document } from "mongoose";

export interface IInterview extends Document {
  companyName: String;
  position: String;
  dateOfInterview?: String;
}

const interviewSchema = new mongoose.Schema<IInterview>({
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  dateOfInterview: {
    type: Date,
    required: true,
  },
});

const Interview = mongoose.model<IInterview>("Interview", interviewSchema);

export default Interview;
