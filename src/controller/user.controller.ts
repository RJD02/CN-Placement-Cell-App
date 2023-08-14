import { Request, Response } from "express";
import asyncWrap from "../utils/asyncWrapper";
import bcrypt from 'bcrypt'
import User, { IUser } from "../models/user.model";
import UserDAL from "../repository/user.repo";
import { sendEmail } from "../utils/sendEmail";
import { ADMIN_EMAIL, FOR_APPROVAL_REQUEST, SEND_SIGNUP_CONFIRMATION_TO_USER, SERVER_EMAIL } from "../config/email.config";
import IJsonResponse from "../utils/jsonResponse";

const userDAL = new UserDAL(User);

const saltRounds = 10;

export const signup = asyncWrap(async (req: Request, res: Response) => {
    const user: IUser = req.body;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    const newUser = await userDAL.create(user);
    if(!newUser) return res.status(400).json({message: "Cannot create user"});
    await sendEmail({
        from: SERVER_EMAIL,
        to: ADMIN_EMAIL,
        subject: 'Approval Request',
        html: FOR_APPROVAL_REQUEST
    })
    await sendEmail({
        from: SERVER_EMAIL,
        to: newUser.email,
        subject: "Your mail is registered on coding ninjas website",
        html: SEND_SIGNUP_CONFIRMATION_TO_USER
    })
    const successJsonMsg: IJsonResponse = {
        message: "Successfully create a user",
        data: newUser,
    }
    return res.status(200).json(successJsonMsg);
})

export const login = asyncWrap(async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = (await userDAL.find({ email }))[0]
    // this should return us only one user
    if(!user) return res.status(400).json({message: "No user with this email found"});
    const match  = await bcrypt.compare(password, user.password);
    if(match) {
        console.log("Logged in");
        return res.status(200).json({message: "Successfully logged in"});
    }
    return res.status(403).json({message: "Cannot login"});
});




