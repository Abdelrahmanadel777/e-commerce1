import { Users } from "../../database/models/user.model.js"
import { AppError } from "../utils/AppError.js"

export const checkEmail = async (req, res, next) => {
    let isExist = await Users.findOne({ email: req.body.email })
    { isExist ? next(new AppError('this email is exist', 409)) : next() }
}