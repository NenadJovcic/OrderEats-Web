import { Router } from "express";
import {
  menu_get,
  menu_post,
  menu_delete,
} from "../controllers/menuController.js";
import { protect, restrictToAdmin } from "../controllers/userController.js";
import User from "../models/userSchema.js";

const menuRoutes = Router();
// restrictTo(User.$where(i)) is a function that checks if the user is an admin or not
 menuRoutes.get(
  "/",
  protect,
  restrictToAdmin,
  menu_get
);
menuRoutes.post("/", protect, menu_post);
menuRoutes.delete("/", menu_delete);

export default menuRoutes;
