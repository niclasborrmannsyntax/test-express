import express from "express";
import {
  getUser,
  getUsers,
  createNewUser,
} from "../controllers/users.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const userRouter = express.Router();

userRouter.get("/:userId", checkAuth, getUser);
userRouter.get("/", checkAuth, getUsers);
userRouter.post("/", checkAuth, createNewUser);

export { userRouter };
