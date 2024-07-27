import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const route = express.Router();

route.post("/login", loginUser);
route.post("/register", registerUser);

export default route;
