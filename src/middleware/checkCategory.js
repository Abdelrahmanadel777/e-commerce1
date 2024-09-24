import { Category } from "../../database/models/category.model.js"
import { AppError } from "../utils/AppError.js"


export const checkCategory = async(req, res, next) => {
    let getCategory = await Category.findById(req.body.category)
    getCategory || next(new AppError('this category is not exist', 404))
    !getCategory || next()
}