import express from "express";
import {login, signup , logout, getMe} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

//checks if the user is logged in or not
router.get("/me",protectRoute, getMe)  // we have to create a middleware to protect the routes

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

export default router;