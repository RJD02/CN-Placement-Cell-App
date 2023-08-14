import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  batch: string;
  password: string;
  isAdmin: Boolean;
  isApproved: Boolean;
  email: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
