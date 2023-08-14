import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  "helloworldthisisravirajdulangeandthisistheplacementcellappforcodingninjasproject";

export const authenticateToken = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "invalid token" });
  }
  return next();
};
