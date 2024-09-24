import { Router } from "express";

import { addCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from "./coupon.controller.js";
import { allowedTo, protectedRoute } from "../authentication/auth.controller.js";


export const couponRouter = Router()
couponRouter.use(protectedRoute, allowedTo('Admin'))
couponRouter.route('/').post(addCoupon).get(getCoupons)
couponRouter.route('/:id').put(updateCoupon).delete(deleteCoupon).get(getCoupon)

