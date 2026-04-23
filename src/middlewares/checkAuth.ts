import type { Request, Response, NextFunction } from "express";
import { readSessions } from "../databases/auth.storage.ts";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sessionId = req.cookies.sessionId;
  const sessions = await readSessions();
  const userSession = sessions.find(
    (session: any) => session.sessionId === sessionId,
  );
  if (!userSession) {
    return res.status(401).json({ error: "Not signed in." });
  }
  req.body.user = userSession.username;
  next();
}
