import slugify from "slugify"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brands } from "../../../database/models/brand.model.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"




export const addBrand = catchError(async (req, res) => {
    req.body.logo = req.file.filename
    req.body.slug = slugify(req.body.name)
    let brand = new Brands(req.body)
    await brand.save()
    res.json({ message: "success", brand })

})
export const getBrands = catchError(async (req, res) => {
    let apiFeatures = new ApiFeatures(Brands.find(), req.query).pagination().sort().search().filter().fields()
    let brands = await apiFeatures.mongooseQuery


    res.json({ message: 'success', page: apiFeatures.pageNumber, brands })
})
export const getBrand = catchError(async (req, res, next) => {
    let Brand = await Brands.findById(req.params.id)
    Brand || next(new AppError('Brand not found', 404))
    !Brand || res.json({ message: 'success', Brand })
})
export const updateBrand = catchError(async (req, res, next) => {

    if (req.body.name) req.body.slug = slugify(req.body.name)
    { req.file ? req.body.logo = req.file.filename : '' }
    let Brand = await Brands.findByIdAndUpdate(req.params.id, req.body, { new: true })
    Brand || next(new AppError('Brand not found', 404))
    !Brand || res.json({ message: 'updated', Brand })
})
export const deleteBrand = catchError(async (req, res, next) => {

    let Brand = await Brands.findByIdAndDelete(req.params.id)
    Brand || next(new AppError('Brand not found', 404))
    !Brand || res.json({ message: 'deleted', Brand })
})