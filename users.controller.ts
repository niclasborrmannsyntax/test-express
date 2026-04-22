import type { Request, Response, NextFunction } from "express";
import { getSimpleUserById } from "./users.service.ts";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;

  const user = await getSimpleUserById(Number(userId));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}
