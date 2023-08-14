import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export default interface IJsonResponse {
    err?: Error | mongoose.Error | unknown | any,
    data?: [] | {} | null,
    message: string
    jsonToken ?: string
}

