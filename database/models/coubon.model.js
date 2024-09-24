import { model, Schema } from "mongoose";

const coubonSchema = new Schema({
    code: {
        type: String,
        unique:true
    },
    discount: {
        type: Number,
        
    },
    expires: {
        type: Date,
       
    }

}, { timestamps: true, versionKey: false })
export const Coupon = model('Coupon', coubonSchema)