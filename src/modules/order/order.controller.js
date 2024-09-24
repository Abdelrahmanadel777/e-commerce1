import { Cart } from "../../../database/models/cart.model.js"
import { Order } from "../../../database/models/order.model.js"
import { Products } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import Stripe from 'stripe'


const stripe = new Stripe('sk_test_51Q2FEaRoJUsLmlasRrs3M60kZyzZ3zNVjZcReFrnCro2qSDdrbkBmHhygACtBWaE1EPDmcXpEQ5nqJ6mBphhc5J500sts9pfeI');
export const createOrder = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return next(new AppError('this user does not make an order', 404))
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let order = new Order({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddresses: [req.body],
        totalOrderPrice

    })

    await order.save()
    let options = cart.cartItems.map((prod) => {
        return (
            {
                updateOne: {
                    "filter": { _id: prod.product },
                    "update": { $inc: { sold: prod.quantity, stock: -prod.quantity } }
                }
            }
        )
    })
    await Products.bulkWrite(options)
    await Cart.findOneAndDelete({ user: req.user._id })
    res.json({ message: 'success', order })

})
export const getOrders = catchError(async (req, res, next) => {
    let userObject = {}
    { req.params.id ? userObject.user = req.params.id : '' }

    let userOrder = await Order.find(userObject).populate('orderItems.product')
    if (!userOrder) return next(new AppError('there is no order for this user', 404))
    res.json({ message: 'success', userOrder })
})
export const createCheckoutSession = catchError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if (!cart) return next(new AppError('we need a cart_id', 501))
    let totalCartPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalCartPrice * 100,
                    product_data: {
                        name: req.user.name
                    }

                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: "https://www.youtube.com/",
        cancel_url: "https://www.npmjs.com/package/stripe",
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddresses
    })
    res.json({ message: "success", session })
})