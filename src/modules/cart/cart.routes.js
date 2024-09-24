import { Router } from "express";
import { allowedTo, protectedRoute } from "../authentication/auth.controller.js";
import { addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeFromCart, updateQuantity } from "./cart.controller.js";


export const cartRouter = Router()
cartRouter.route('/').post(protectedRoute, allowedTo('User'), addToCart)
  .get(protectedRoute, allowedTo('User'), getLoggedUserCart)
  .delete(protectedRoute, allowedTo('User'),clearUserCart)
cartRouter.route('/:id').put(updateQuantity)
 .delete(protectedRoute, allowedTo('User'),removeFromCart)
cartRouter.route('/applyCoupon').post(protectedRoute, allowedTo('Admin'),applyCoupon)
