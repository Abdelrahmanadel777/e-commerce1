import { Router } from "express";
import { addReview, deleteReview, getReview, getReviews, updateReview } from "./review.controller.js";
import { allowedTo, protectedRoute } from "../authentication/auth.controller.js";

export const reviewRouter = Router()
reviewRouter.route('/')
    .post(protectedRoute, allowedTo('User'), addReview)
    .get(getReviews)
reviewRouter.route('/:id')
    .put(protectedRoute, allowedTo('User'), updateReview)
    .delete(protectedRoute, allowedTo('User', 'Admin'), deleteReview)
    .get(getReview)
