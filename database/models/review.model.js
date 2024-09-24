import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema({
    comment: {
        type: String,
    },
    user: {
        type: Types.ObjectId,
        ref: 'Users'
    },
    product: {
        type: Types.ObjectId,
        ref: 'Products'
    },
    rate: {
        type: Number,
        min: 0,
        max: 5
    }

}, { timestamps: true, versionKey: false })
export const Review = model('Review', reviewSchema)