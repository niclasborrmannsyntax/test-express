import type { Request, Response, NextFunction } from "express";
import { getName, login, logout } from "./auth.service.ts";

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: "Missing username or password in JSON body",
    });
  }
  const sessionId = await login(username);
  if (!sessionId) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: false, // Auf 'true' setzen, wenn du HTTPS nutzt
    sameSite: "lax",
  });
  res.json({ message: "Login succeeded!" });
}

export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sessionId = req.cookies.sessionId;
  if (sessionId) await logout(sessionId);
  res.clearCookie("sessionId", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({
    success: true,
    message: "Erfolgreich abgemeldet.",
  });
}

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sessionId = req.cookies.sessionId;
  const userName = await getName(sessionId);
  res.json({
    message: "My profile",
    user: userName,
  });
}
