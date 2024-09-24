import slugify from "slugify"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import { Coupon } from "../../../database/models/coubon.model.js"




export const addCoupon = catchError(async (req, res, next) => {
    let isExist = await Coupon.findOne({ code: req.body.code })
    if (isExist) return next(new AppError('this code is already exist', 404))
    let coupon = new Coupon(req.body)
    await coupon.save()
    res.json({ message: "success", coupon })

})
export const getCoupons = catchError(async (req, res) => {
    let apiFeatures = new ApiFeatures(Coupon.find(), req.query).pagination().sort().search().filter().fields()
    let coupons = await apiFeatures.mongooseQuery


    res.json({ message: 'success', page: apiFeatures.pageNumber, coupons })
})
export const getCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findById(req.params.id)
    coupon || next(new AppError('coupon not found', 404))
    !coupon || res.json({ message: 'success', coupon })
})
export const updateCoupon = catchError(async (req, res, next) => {


    let coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true })
    coupon || next(new AppError('coupon not found', 404))
    !coupon || res.json({ message: 'updated', coupon })
})
export const deleteCoupon = catchError(async (req, res, next) => {

    let coupon = await Coupon.findByIdAndDelete(req.params.id)
    coupon || next(new AppError('coupon not found', 404))
    !coupon || res.json({ message: 'deleted', coupon })
})