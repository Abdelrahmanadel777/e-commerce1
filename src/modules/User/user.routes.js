import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { orderRouter } from "../order/order.routes.js";


export const userRouter = Router()
userRouter.use('/:id/order', orderRouter)
userRouter.route('/').post(checkEmail, addUser).get(getUsers)
userRouter.route('/:id').put(checkEmail, updateUser).delete(deleteUser).get(getUser)