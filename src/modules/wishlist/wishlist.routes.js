import { Router } from "express";

import { addToWishlist, getWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowedTo, protectedRoute } from "../authentication/auth.controller.js";


export const wishlistRouter = Router()

wishlistRouter.route('/')
    .patch(protectedRoute, allowedTo('User'), addToWishlist)
    .delete(protectedRoute, allowedTo('User'), removeFromWishlist)
    .get(protectedRoute, allowedTo('User'), getWishlist)
