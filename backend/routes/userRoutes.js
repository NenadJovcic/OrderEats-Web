import { Router } from "express";
import { login_post, test_get, signup_post, user_delete } from "../controllers/userController.js";


const userRoutes = Router();

userRoutes.get('/test', test_get)
userRoutes.post('/signup', signup_post)
userRoutes.delete("/delete", user_delete)
userRoutes.post('/login', login_post)

export default userRoutes 