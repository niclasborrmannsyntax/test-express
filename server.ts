import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { userRouter } from "./src/routes/users.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import handleServerErrors from "./src/middlewares/handleServerErrors.js";
import { handleUserErrors } from "./src/middlewares/handleUserErrors.js";
// import { initPostgres } from "./src/databases/init.postgres.js";

// INIT
const PORT = Number(process.env.PORT ?? 3000);
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ROUTES
app.use("/users", userRouter);
app.use("/auth", authRouter);

// SPECIFIC ROUTES ERROR HANDLING
app.use(handleUserErrors);

// GLOBAL ERROR HANDLING
app.use(handleServerErrors);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
