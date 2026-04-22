import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { userRouter } from "./src/routes/users.routes.ts";
import { authRouter } from "./src/routes/auth.routes.ts";

// INIT
const PORT = 3001;
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ROUTES
app.use("/users", userRouter);
app.use("/auth", authRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
