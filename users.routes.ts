import express from "express";
import { getUser } from "./users.controller.ts";

const simpleUserRouter = express.Router();

// GET USER BY ID
simpleUserRouter.get("/:userId", getUser);

// GET ALL USERS
simpleUserRouter.get("/");

// CREATE NEW USER
simpleUserRouter.post("/");

export { simpleUserRouter };
