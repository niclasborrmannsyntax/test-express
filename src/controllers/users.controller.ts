import {
  getUserById,
  getAllUsers,
  createUser,
} from "../services/users.service.ts";
import type { Request, Response, NextFunction } from "express";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const user = await getUserById(Number(userId));
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username } = req.body ?? {};
    if (typeof username !== "string" || !username.trim()) {
      return res.status(400).json({
        message: "Username is required in JSON body",
      });
    }

    const newUser = await createUser(username);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}
