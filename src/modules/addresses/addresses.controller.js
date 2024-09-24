import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { Users } from "../../../database/models/user.model.js"





export const addToaddresses = catchError(async (req, res, next) => {


    let addresses = await Users.findByIdAndUpdate(req.user._id, { $push: { addresses: req.body } }, { new: true })
    addresses || next(new AppError('addresses not found', 404))
    !addresses || res.json({ message: 'success', addresses: addresses.addresses })
})
export const removeFromAdressess = catchError(async (req, res, next) => {


    let addresses = await Users.findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true })
    addresses || next(new AppError('addresses not found', 404))
    !addresses || res.json({ message: 'success', addresses: addresses.addresses })
})
export const getaddresses = catchError(async (req, res, next) => {


    let addresses = await Users.findByIdAndUpdate(req.user._id, { new: true })
    addresses || next(new AppError('addresses not found', 404))
    !addresses || res.json({ message: 'success', addresses: addresses.addresses })
})