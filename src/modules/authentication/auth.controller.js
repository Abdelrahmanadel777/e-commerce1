import { Users } from "../../../database/models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"

export const signUp = async (req, res) => {
    let user = Users(req.body)
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
    await user.save()
    res.json({ message: 'added', user, token })
}
export const signIn = async (req, res, next) => {
    let user = await Users.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {

        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)

        res.json({ message: 'success', user, token })
    } else {
        next(new AppError('this email is not exist', 409))
    }

}
export const changePassword = catchError(async (req, res, next) => {
    let user = await Users.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
        req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8)
        let newUpdate = await Users.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword, passwordCreatedAt: Date.now() }, { new: true })
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
        res.json({ message: 'success', newUpdate, token })
    } else {
        next(new AppError('incorrect password or email', 409))
    }
})
export const protectedRoute = catchError(async (req, res, next) => {
    let { token } = req.headers
    let userPayload = null
    if (!token) return next(new AppError('token must be provided', 401))

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) return next(new AppError('invalid token', 401))




        userPayload = payload
    })
    let user = await Users.findById(userPayload.userId)
    if (!user) return next(new AppError('user is not exist', 404))
    let time = parseInt(user.passwordCreatedAt?.getTime() / 1000)
    if (time > userPayload.iat) return next(new AppError('invalid token....login again'), 401)
    req.user = user

    next()

})
export const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {

            next()
        } else {
            console.log(req.user.role);
            next(new AppError('not allowed for you ', 401))
        }
    }
}