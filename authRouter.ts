// app.use(express.json());
// app.use(cookieParser());

import express from "express";
import { v4 as uuid } from "uuid";

const authRouter = express.Router();

type Username = string;
const sessions = new Map<string, Username>();

const checkAuth = (req: any, res: any, next: any) => {
  const sessionId = req.cookies.sessionId;
  const userSession = sessions.get(sessionId);

  if (!userSession) {
    return res.status(401).json({ error: "Please sign in!" });
  }

  req.user = userSession;
};

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({
      error: "Missing username or password in JSON body",
    });
  }

  if (username !== "admin" || password !== "123") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const sessionId = uuid();
  sessions.set(sessionId, username);
  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: false, // Auf 'true' setzen, wenn du HTTPS nutzt
    sameSite: "lax",
  });
  res.json({ message: "Login succeeded!" });
});

authRouter.post("/logout", (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.clearCookie("sessionId", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({
    success: true,
    message: "Erfolgreich abgemeldet.",
  });
});

authRouter.get("/me", (req, res) => {
  const sessionId = req.cookies.sessionId;
  const userSession = sessions.get(sessionId);

  if (!userSession) {
    return res.status(401).json({ error: "Not signed in." });
  }

  res.json({
    message: "My profile",
    user: userSession,
  });
});

authRouter.get("/protected", checkAuth, (req, res) => {
  const userSession = sessions.get(req.cookies.sessionId);
  res.json({
    message: `This is you: ${userSession}`,
  });
});

export { authRouter };
