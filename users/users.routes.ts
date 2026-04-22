import express from "express";
import { getUser, getUsers, createNewUser } from "./users.controller.ts";

const userRouter = express.Router();

userRouter.get("/:userId", getUser);
userRouter.get("/", getUsers);
userRouter.post("/", createNewUser);

export { userRouter };
