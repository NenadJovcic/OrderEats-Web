import { Router } from "express";
import {
  orders_get_ready,
  orders_get_unready,
  orders_post,
  orders_delete,
  orders_getByOrdersId,
  orders_getByUserId,
  orders_put,
  order_delete_all,
} from "../controllers/orderController.js";
import { verifyToken } from "../verifyToken.js";
import { restrictToAdmin } from "../controllers/userController.js";

const orderRoutes = Router();

orderRoutes.get("/ready", orders_get_ready);
orderRoutes.get("/unready", orders_get_unready);
orderRoutes.post("/", verifyToken, orders_post);
orderRoutes.delete("/delete/:id", orders_delete);
orderRoutes.delete("/deleteall", order_delete_all);
orderRoutes.get(
  "/orderid/:id",
  verifyToken,
  restrictToAdmin,
  orders_getByOrdersId
);
orderRoutes.get("/:id", verifyToken, orders_getByUserId);
orderRoutes.put("/:id", verifyToken, orders_put);

export default orderRoutes;
