import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { userRouter } from "./src/routes/users.routes.ts";
import { authRouter } from "./src/routes/auth.routes.ts";
import handleServerErrors from "./src/middlewares/handleServerErrors.ts";
import { handleUserErrors } from "./src/middlewares/handleUserErrors.ts";
import { initPostgres } from "./src/databases/init.postgres.ts";

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

// SPECIFIC ROUTES ERROR HANDLING
app.use(handleUserErrors);

// GLOBAL ERROR HANDLING
app.use(handleServerErrors);

async function startServer() {
  await initPostgres();

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
