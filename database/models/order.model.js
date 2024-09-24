import { model, Schema, Types } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    orderItems: [
        {
            product: { type: Types.ObjectId, ref: "Products" },
            quantity: { type: Number, default: 1 },
            price: Number
        }
    ],
    shippingAddresses: [
        {
            city: String,
            phone: String,
            street: String
        }
    ],
    paymentType: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    paidAt: Date,
    deliveredAt: Date,
    isDelivered: {
        type: Boolean,
        default: false
    }

}, { timestamps: true, versionKey: false })


export const Order = model('Order', orderSchema)