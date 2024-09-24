import { Router } from "express";
import { createCheckoutSession, createOrder, getOrders } from "./order.controller.js";
import { allowedTo, protectedRoute } from "../authentication/auth.controller.js";


export const orderRouter = Router({ mergeParams: true })
orderRouter.route('/').post(protectedRoute, allowedTo('User'), createOrder)
    .get(protectedRoute, allowedTo('User', 'Admin'), getOrders)
orderRouter.route('/checkout/:id').post(protectedRoute, allowedTo('User'),createCheckoutSession)

