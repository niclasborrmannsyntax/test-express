import express from "express";
import { getProfile, loginUser, logoutUser } from "../controllers/auth.controller.ts";
import { checkAuth } from "../middlewares/checkAuth.ts";

const authRouter = express.Router();

authRouter.post("/login", loginUser);

authRouter.get("/me", checkAuth, getProfile);

authRouter.post("/logout", checkAuth, logoutUser);

export { authRouter };
