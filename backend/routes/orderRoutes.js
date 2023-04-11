import { Router } from "express";
import {
  orders_get_ready,
  orders_get_unready,
  orders_post,
  orders_delete,
  orders_getByOrdersId,
  orders_getByUserId,
  orders_put,
} from "../controllers/orderController.js";
import { verifyToken } from "../verifyToken.js";
import { restrictToAdmin } from "../controllers/userController.js";

const orderRoutes = Router();

orderRoutes.get("/ready", orders_get_ready);
orderRoutes.get("/unready", orders_get_unready);
orderRoutes.post("/", verifyToken, orders_post);
orderRoutes.delete("/", orders_delete);
orderRoutes.get(
  "/orderid/:id",
  verifyToken,
  restrictToAdmin,
  orders_getByOrdersId
);
orderRoutes.get("/:id", verifyToken, orders_getByUserId);
orderRoutes.put("/:id", verifyToken, orders_put);

export default orderRoutes;
