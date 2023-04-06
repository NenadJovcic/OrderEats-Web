import { Router } from "express";
import { orders_get, orders_post, orders_delete } from '../controllers/orderController.js'
import { verifyToken } from '../verifyToken.js'


const orderRoutes = Router();

orderRoutes.get('/', orders_get)
orderRoutes.post('/', orders_post)
orderRoutes.delete("/", orders_delete)


export default orderRoutes 