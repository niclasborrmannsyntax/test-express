import express from "express";
import { getUser, getUsers, createNewUser } from "./users.controller.ts";
import { checkAuth } from "../middlewares/checkAuth.ts";

const userRouter = express.Router();

userRouter.get("/:userId", checkAuth, getUser);
userRouter.get("/", checkAuth, getUsers);
userRouter.post("/", checkAuth, createNewUser);

export { userRouter };
