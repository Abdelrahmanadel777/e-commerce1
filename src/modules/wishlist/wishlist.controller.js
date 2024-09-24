import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { Users } from "../../../database/models/user.model.js"





export const addToWishlist = catchError(async (req, res, next) => {


    let wishlist = await Users.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.body.product } }, { new: true })
    wishlist || next(new AppError('wishlist not found', 404))
    !wishlist || res.json({ message: 'success', wishlist: wishlist.wishlist })
})
export const removeFromWishlist = catchError(async (req, res, next) => {


    let wishlist = await Users.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.body.product } }, { new: true })
    wishlist || next(new AppError('wishlist not found', 404))
    !wishlist || res.json({ message: 'success', wishlist: wishlist.wishlist })
})
export const getWishlist = catchError(async (req, res, next) => {


    let wishlist = await Users.findByIdAndUpdate(req.user._id, { new: true }).populate('wishlist')
    wishlist || next(new AppError('wishlist not found', 404))
    !wishlist || res.json({ message: 'success', wishlist: wishlist.wishlist })
})