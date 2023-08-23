import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/jwt.config";
import IJsonResponse from "../utils/jsonResponse";

export const authenticateToken = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    const noHeaderJsonResponse: IJsonResponse = {
      message: "No header/auth provided",
    };
    return res.status(400).json(noHeaderJsonResponse);
  }
  if (authHeader.split(" ").length < 1) return res.sendStatus(400);
  const token = authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "invalid token" });
  }
  return next();
};
