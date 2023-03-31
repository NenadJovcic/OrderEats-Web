import { Router } from "express";
import {signup_get, signup_post} from "../controllers/userController.js";


const userRoutes = Router();

userRoutes.get('/signup', signup_get)
userRoutes.post('/signup', signup_post)

export default userRoutes 