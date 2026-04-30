import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);

authRouter.get("/me", checkAuth, getProfile);

authRouter.post("/logout", checkAuth, logoutUser);

export { authRouter };
