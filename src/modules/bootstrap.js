import { addressesRouter } from "./addresses/addresses.routes.js"
import { authRouter } from "./authentication/auth.routes.js"
import { brandRouter } from "./Brand/brand.routes.js"
import { cartRouter } from "./cart/cart.routes.js"
import { categoryRouter } from "./category/category.routes.js"
import { couponRouter } from "./coupon/coupon.routes.js"
import { orderRouter } from "./order/order.routes.js"
import { productRouter } from "./Product/product.routes.js"
import { reviewRouter } from "./review/review.routes.js"
import { subCategoryRouter } from "./subCategory/subcategory.routes.js"
import { userRouter } from "./User/user.routes.js"
import { wishlistRouter } from "./wishlist/wishlist.routes.js"


export const bootstrap = (app) => {
    app.use('/api/categories', categoryRouter)
    app.use('/api/subCategories', subCategoryRouter)
    app.use('/api/brands', brandRouter)
    app.use('/api/products', productRouter)
    app.use('/api/users', userRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/reviews', reviewRouter)
    app.use('/api/wishlist', wishlistRouter)
    app.use('/api/addresses', addressesRouter)
    app.use('/api/coupons', couponRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/order', orderRouter)

}
