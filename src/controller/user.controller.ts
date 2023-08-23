import { Request, Response } from "express";
import asyncWrap from "../utils/asyncWrapper";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import UserDAL from "../repository/user.repo";
import { sendEmail } from "../utils/sendEmail";
import {
  ADMIN_EMAIL,
  APPROVED_CONFIRMATION,
  FOR_APPROVAL_REQUEST,
  SEND_SIGNUP_CONFIRMATION_TO_USER,
  SERVER_EMAIL,
} from "../config/email.config";
import IJsonResponse from "../utils/jsonResponse";
import { JWT_SALT_ROUNDS } from "../config/bcrypt.config";
import { JWT_SECRET_KEY } from "../config/jwt.config";

const userDAL = new UserDAL(User);

export const signup = asyncWrap(async (req: Request, res: Response) => {
  const user: IUser = req.body;
  console.log(user);
  // hash the password to store
  const hashedPassword = await bcrypt.hash(user.password, JWT_SALT_ROUNDS);
  user.password = hashedPassword;
  const newUser = await userDAL.create(user);
  if (!newUser) return res.status(400).json({ message: "Cannot create user" });
  // send email to admin to approve
  await sendEmail({
    from: SERVER_EMAIL,
    to: ADMIN_EMAIL,
    subject: "Approval Request",
    html: FOR_APPROVAL_REQUEST,
  });
  // send email to user
  await sendEmail({
    from: SERVER_EMAIL,
    to: newUser.email,
    subject: "Your mail is registered on coding ninjas website",
    html: SEND_SIGNUP_CONFIRMATION_TO_USER,
  });
  const now = new Date();
  const userData: JwtPayload = {
    email: newUser.email,
    batch: newUser.batch,
    id: newUser._id,
    exp: now.setMonth(now.getMonth() + 2),
  };
  const jsonToken = jwt.sign(userData, JWT_SECRET_KEY);
  // send back the jwt token
  const successJsonMsg: IJsonResponse = {
    message: "Successfully create a user",
    data: newUser,
    jsonToken,
  };

  return res.status(200).json(successJsonMsg);
});

export const login = asyncWrap(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = (await userDAL.find({ email }))[0];
  // this should return us only one user
  if (!user)
    return res.status(400).json({ message: "No user with this email found" });
  const match = await bcrypt.compare(password, user.password);
  // return if password not matched
  if (!match) {
    return res.status(403).json({ message: "Cannot login" });
  }
  // is not approved send back a message
  if (!user.isApproved) {
    console.log("Not approved");
    await sendEmail({
      to: ADMIN_EMAIL,
      from: SERVER_EMAIL,
      subject: "Approval Request",
      html: FOR_APPROVAL_REQUEST,
    });
    return res.status(200).json({ message: "User not approved yet" });
  }
  // send back the jwt token
  const now = new Date();
  const userData: JwtPayload = {
    email: user.email,
    batch: user.batch,
    id: user._id,
    exp: now.setMonth(now.getMonth() + 2),
  };
  const jsonToken = jwt.sign(userData, JWT_SECRET_KEY);
  const successJsonMsg: IJsonResponse = {
    message: "Successfully logged in",
    data: user,
    jsonToken,
  };
  console.log("Logged in");
  return res.status(200).json(successJsonMsg);
});

export const approveUser = asyncWrap(
  async (req: Request | any, res: Response) => {
    const isAdminId = req.user.id;
    const admin = await userDAL.findById(isAdminId);
    if (!admin) {
      const noAdminFoundJsonResponse: IJsonResponse = {
        message: "No admin with that id found",
      };
      return res.status(400).json(noAdminFoundJsonResponse);
    }
    if (!admin?.isAdmin) {
      const notAdminJsonResponse: IJsonResponse = {
        message: "You are not an admin",
      };
      return res.status(403).json(notAdminJsonResponse);
    }
    const userId = req.params.id;
    const user = await userDAL.findById(userId);
    if (!user) {
      const noUserFoundJsonResponse: IJsonResponse = {
        message: "No user with this id found",
      };
      return res.status(400).json(noUserFoundJsonResponse);
    }
    user.isApproved = true;
    await user.save();
    // send email to user that their email is approved
    await sendEmail({
      from: SERVER_EMAIL,
      to: user.email,
      subject: "Access request approved",
      html: APPROVED_CONFIRMATION,
    });
    const successJsonResponse: IJsonResponse = {
      message: "Successfully approved the user",
      data: user,
    };
    res.status(200).json(successJsonResponse);
  }
);

export const getUsers = asyncWrap(async (req: Request | any, res: Response) => {
  const users = await userDAL.all();
  const successJsonResponse: IJsonResponse = {
    data: users,
    message: "Successfully fetched all users",
  };
  return res.status(200).json(successJsonResponse);
});

export const getUnApprovedUsers = asyncWrap(
  async (req: Request | any, res: Response) => {
    const id = req.user.id;
    console.log(id);
    const adminUser = await userDAL.findById(id);
    if (!adminUser) {
      const noUserFound: IJsonResponse = {
        message: "No user with that id found",
      };
      return res.status(403).json(noUserFound);
    }
    if (!adminUser.isAdmin) {
      const notAdmin: IJsonResponse = {
        message: "This url can only be accessed by admins",
      };
      return res.status(403).json(notAdmin);
    }
    const unApprovedUsers = await userDAL.find({ isApproved: false });
    const successJsonResponse: IJsonResponse = {
      data: unApprovedUsers,
      message: "Successfully fetched all unapproved users",
    };
    return res.status(200).json(successJsonResponse);
  }
);

export const downloadReport = asyncWrap(
  async (req: Request, res: Response) => {

  }
);
