import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { Review } from "../../../database/models/review.model.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"




export const addReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id
    let isExist = await Review.findOne({ user: req.user._id, product: req.body.product })
    if (isExist) return next(new AppError('you already reviewed', 404))
    let review = new Review(req.body)


    await review.save()
    res.json({ message: "success", review })

})
export const getReviews = catchError(async (req, res) => {
    let apiFeatures = new ApiFeatures(Review.find(), req.query).pagination().sort().search().filter().fields()
    let reviews = await apiFeatures.mongooseQuery


    res.json({ message: 'success', page: apiFeatures.pageNumber, reviews })
})
export const getReview = catchError(async (req, res, next) => {
    let review = await Review.findById(req.params.id)
    review || next(new AppError('review not found', 404))
    !review || res.json({ message: 'success', review })
})
export const updateReview = catchError(async (req, res, next) => {


    let review = await Review.findByIdAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    review || next(new AppError('can not update in this review', 404))
    !review || res.json({ message: 'updated', review })
})
export const deleteReview = catchError(async (req, res, next) => {

    let review = await Review.findByIdAndDelete(req.params.id)
    review || next(new AppError('review not found', 404))
    !review || res.json({ message: 'deleted', review })
})