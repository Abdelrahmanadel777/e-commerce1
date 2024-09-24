import slugify from "slugify"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { Products } from "../../../database/models/product.model.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"




export const addProduct = catchError(async (req, res) => {
    req.body.slug = slugify(req.body.title)
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map(img => img.filename)
    let Product = new Products(req.body)
    await Product.save()
    res.json({ message: "success", Product })

})
export const getProducts = catchError(async (req, res) => {


    let apiFeatures = new ApiFeatures(Products.find(), req.query).pagination().sort().search().filter().fields()

    let products = await apiFeatures.mongooseQuery


    res.json({ message: 'success', page: apiFeatures.pageNumber, products })
})
export const getProduct = catchError(async (req, res, next) => {
    let Product = await Products.findById(req.params.id)
    Product || next(new AppError('Product not found', 404))
    !Product || res.json({ message: 'success', Product })
})
export const updateProduct = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.files.imageCover) {
        req.body.imageCover = req.files.imageCover[0].filenamne
    }
    if (req.files.images) {
        req.body.images = req.files.images.map(img => img.filename)

    }


    let Product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
    Product || next(new AppError('Product not found', 404))
    !Product || res.json({ message: 'updated', Product })
})
export const deleteProduct = catchError(async (req, res, next) => {

    let Product = await Products.findByIdAndDelete(req.params.id)
    Product || next(new AppError('Product not found', 404))
    !Product || res.json({ message: 'deleted', Product })
})