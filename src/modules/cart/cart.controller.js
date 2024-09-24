import { Cart } from "../../../database/models/cart.model.js"
import { Coupon } from "../../../database/models/coubon.model.js"
import { Products } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"


function totalCartPrice(cart) {
    if (cart?.cartItems.length == 0) {
        cart.totalCartPrice = 0


    } else {


        let total = 0
        cart.cartItems.forEach(item => {

            total += item.quantity * item.price

            cart.totalCartPrice = total || 0

        })
        if (cart.discount) {
            cart.totalCartPriceAfterDiscount = cart.totalCartPrice - (cart.totalCartPrice * cart.discount) / 100

        }
    }






}

export const addToCart = catchError(async (req, res, next) => {
    let isCartExisted = await Cart.findOne({ user: req.user._id })
    let product = await Products.findById(req.body.product)
    if (isCartExisted) {
        let item = isCartExisted.cartItems.find((item) => item.product == req.body.product)


        if (item) {
            item.quantity += req.body.quantity || 1
            if (item.quantity > product.stock) return next(new AppError('sold out', 404))
            totalCartPrice(isCartExisted, product)
            await isCartExisted.save()
            res.json({ message: 'success', isCartExisted })

        } else {


            isCartExisted.cartItems.push(req.body)
            totalCartPrice(isCartExisted)
            await isCartExisted.save()
            res.json({ message: 'success', cart: isCartExisted })
        }

    } else {
        let userCart = new Cart({
            user: req.user._id,
            cartItems: [req.body]
        })

        if (userCart.cartItems[0].quantity > product.stock) return next(new AppError('sold out', 404))
        totalCartPrice(userCart)
        await userCart.save()
        res.json({ message: 'success', userCart })

    }

})
export const updateQuantity = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id })
    let product = await Products.findById(req.params.id)
    if (!cart) return next(new AppError('this cart is not found'))
    let item = cart.cartItems.find((item => item.product == req.params.id))
    if (!item) return next(new AppError('this product is not found'))
    item.quantity = req.body.quantity
    if (item.quantity > product.stock) return next(new AppError('sold out', 404))
    totalCartPrice(cart)
    await cart.save()
    res.json({ message: 'success', cart })


})
export const removeFromCart = catchError(async (req, res, next) => {



    let cart = await Cart.findOneAndUpdate({ user: req.user._id }, {
        $pull: { cartItems: { product: req.params.id } }
    }, { new: true })

    if (!cart) return next(new AppError('cart not found', 404))


    totalCartPrice(cart)
    await cart.save()
    res.json({ message: 'success', cart })

})
export const getLoggedUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id })
    { cart ? res.json({ message: 'success', cart }) : next(new AppError('this user does not have a cart', 404)) }
})
export const clearUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOneAndDelete({ user: req.user._id })
    { cart ? res.json({ message: 'success', cart }) : next(new AppError('this user does not have a cart', 404)) }
})
export const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findOne({ code: req.body.code, expires: { $gte: Date.now() } })
    if (!coupon) return next(new AppError('invalid coupon or expired'))
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return next(new AppError('this user does not have a cart', 404))
    cart.totalCartPriceAfterDiscount = cart.totalCartPrice - (cart.totalCartPrice * coupon.discount) / 100
    cart.discount = coupon.discount
    await cart.save()
    res.json({ message: 'success', cart })
})
