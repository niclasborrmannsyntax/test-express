import express from "express";
import { getUser } from "./users.controller.ts";
import { checkAuth } from "./middlewares/checkAuth.ts";

const simpleUserRouter = express.Router();

// GET USER BY ID
simpleUserRouter.get("/:userId", checkAuth, getUser);

// GET ALL USERS
simpleUserRouter.get("/");

// CREATE NEW USER
simpleUserRouter.post("/");

export { simpleUserRouter };
