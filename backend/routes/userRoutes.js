import { Router } from "express";
import userController from "../controllers/userController.js";


const userRoutes = Router();

userRoutes.get('/signup', userController.signup_get)
userRoutes.post('/signup', userController.signup_post)

export default userRoutes 