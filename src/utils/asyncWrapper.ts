import { Request, Response, NextFunction } from "express";

export default function asyncWrap(controller: CallableFunction) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      console.log(err);
      res.status(500).json({ err, message: "Something went wrong" });
    }
  };
}
