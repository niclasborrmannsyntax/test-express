import express from "express";
import { v4 as uuid } from "uuid";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// ROUTES
import { userRouter } from "./users/users.routes.ts";
import { simpleUserRouter } from "./users.routes.ts";

// MOUDLES
const logRoute = morgan("dev");

// INIT
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/users", userRouter);
app.use("/simple-users", simpleUserRouter);

// Logge bestimmte Route
app.get("/log", logRoute, (req, res) => {
  res.send("Check your terminal!");
});

app.get("/", (req, res) => {
  res.send("Hello, this is your first Express app!");
});

app.get("/greet", (req, res) => {
  res.send(`Hello, User!`);
});

// ------------------------
// Authentication Endpoints
// ------------------------

type Username = string;
const sessions = new Map<string, Username>();

const checkAuth = (req: any, res: any, next: any) => {
  const sessionId = req.cookies.sessionId;
  const userSession = sessions.get(sessionId);

  if (!userSession) {
    return res.status(401).json({ error: "Not signed in." });
  }
  req.user = userSession;
  next();
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;
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

app.get("/me", checkAuth, (req: any, res) => {
  res.json({
    message: "My profile",
    user: req.user,
  });
});

app.post("/logout", (req, res) => {
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

// ------------------------

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
