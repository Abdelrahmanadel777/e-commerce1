import { Router } from "express";
import { changePassword, signIn, signUp } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";

export const authRouter = Router()
authRouter.route('/signUp').post(checkEmail, signUp).post(signIn)
authRouter.route('/signIn').post(signIn)
authRouter.route('/changePassword').patch(changePassword)