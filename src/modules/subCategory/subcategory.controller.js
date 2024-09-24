import slugify from "slugify"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { SubCategory } from "../../../database/models/subCategory.model.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"




export const addSubCategory = catchError(async (req, res) => {
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategory(req.body)
    await subCategory.save()
    res.json({ message: "success", subCategory })

})
export const getSubCategories = catchError(async (req, res) => {

    let categoryObject = {}
    { req.params.id ? categoryObject.category = req.params.id : "" }

    let apiFeatures = new ApiFeatures(SubCategory.find(categoryObject), req.query).pagination().sort().search().filter().fields()

    let subCategories = await apiFeatures.mongooseQuery



    res.json({ message: 'success', page: apiFeatures.pageNumber, subCategories })





})
export const getSubCategory = catchError(async (req, res) => {


    let subCategory = await SubCategory.findById(req.params.id)
    subCategory || next(new AppError('subCategories not found ', 404))
    !subCategory || res.json({ message: 'success', subCategory })
})
export const updateSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    subCategory || next(new AppError('subCategory not found ', 404))
    !subCategory || res.json({ message: 'updated', subCategory })
})
export const deleteSubCategory = catchError(async (req, res, next) => {

    let subCategory = await SubCategory.findByIdAndDelete(req.params.id)
    subCategory || next(new AppError('subCategory not found ', 404))
    !subCategory || res.json({ message: 'deleted', subCategory })
})