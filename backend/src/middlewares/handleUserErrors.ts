import type { Request, Response, NextFunction } from "express";

export class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User not found: ${userId}`);
    this.name = new.target.name;
  }
}

export class InvalidUserDataError extends Error {
  constructor(userName: string) {
    super(`Invalid user data for: ${userName}`);
    this.name = new.target.name;
  }
}

export const handleUserErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof UserNotFoundError) {
    console.error(`${err.name}: ${err.message}`);
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof InvalidUserDataError) {
    console.error(`${err.name}: ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
  next(err);
};
