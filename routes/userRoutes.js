import express from "express";
import { getAllUsers, login, signup } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", signup);
userRoutes.post("/login", login);

export default userRoutes;