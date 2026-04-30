import type { Request, Response, NextFunction } from "express";
import { findSessionById } from "../repositories/session.repo.js";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
      return res.status(401).json({ error: "Not signed in." });
    }

    const userSession = await findSessionById(sessionId);
    if (!userSession) {
      return res.status(401).json({ error: "Not signed in." });
    }

    req.body.user = userSession.username;
    next();
  } catch (err) {
    next(err);
  }
}
