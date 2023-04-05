import { Router } from "express";
import {
  menu_get,
  menu_post,
  menu_delete,
} from "../controllers/menuController.js";
import { protect, restrictTo } from "../controllers/userController.js";

const menuRoutes = Router();

menuRoutes.get("/", menu_get);
menuRoutes.post("/", menu_post);
menuRoutes.delete("/", menu_delete);

export default menuRoutes;
