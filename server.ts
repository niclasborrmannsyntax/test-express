import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// ROUTES
import { userRouter } from "./users/users.routes.ts";
import { simpleUserRouter } from "./users.routes.ts";
import { authRouter } from "./auth/auth.routes.ts";

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
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
