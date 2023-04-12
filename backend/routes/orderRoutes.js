import { Router } from "express";
import {
  orders_get,
  orders_post,
  orders_delete,
  orders_getByOrdersId,
  orders_getByUserId,
} from "../controllers/orderController.js";
import { verifyToken } from "../verifyToken.js";
import { restrictToAdmin } from "../controllers/userController.js";

const orderRoutes = Router();

orderRoutes.get("/", orders_get);
orderRoutes.post("/", verifyToken, orders_post);
orderRoutes.delete("/", orders_delete);
orderRoutes.get(
  "/orderid/:id",
  verifyToken,
  restrictToAdmin,
  orders_getByOrdersId
);
orderRoutes.get("/:id", verifyToken, orders_getByUserId);

export default orderRoutes;
