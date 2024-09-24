import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../../fileHandler/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"




export const addCategory = catchError(async (req, res) => {
    req.body.image = req.file.filename
    req.body.slug = slugify(req.body.name)
    let category = new Category(req.body)
    await category.save()
    res.json({ message: "success", category })

})
export const getCategories = catchError(async (req, res) => {
    let apiFeatures = new ApiFeatures(Category.find(), req.query).pagination().sort().search().filter().fields()
    let categories = await apiFeatures.mongooseQuery
    res.json({ message: 'success', page: apiFeatures.pageNumber, categories })

})
export const getCategory = catchError(async (req, res) => {
    let category = await Category.findById(req.params.id)
    res.json({ message: 'success', category })
})
export const updateCategory = catchError(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename
    if (req.body.name) req.body.slug = slugify(req.body.name)
    let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    category || next(new AppError('category not found', 404))
    !category || res.json({ message: 'updated', category })
})
export const deleteCategory = deleteOne(Category)