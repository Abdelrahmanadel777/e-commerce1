import { model, Schema, Types } from "mongoose";

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    cartItems: [
        {
            product: { type: Types.ObjectId, ref: "User" },
            quantity: { type: Number, default: 1 },
            price:Number
        }
    ],
    totalCartPrice:Number,
    discount:Number,
    totalCartPriceAfterDiscount:Number

}, { timestamps: true, versionKey: false })


export const Cart = model('Cart', cartSchema)