import type { Request, Response, NextFunction } from "express";

const handleServerErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
};

export default handleServerErrors;
