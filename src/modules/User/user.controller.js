import { Users } from "../../../database/models/user.model.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import { AppError } from "../../utils/AppError.js"


export const addUser = async (req, res) => {
    let addUser = new Users(req.body)
    await addUser.save()
    res.json({ message: 'added', addUser })
}
export const getUsers = async (req, res) => {
    let apiFeatures = new ApiFeatures(Users.find(), req.query).pagination().sort().search().filter().fields()
    let users = await apiFeatures.mongooseQuery
    res.json({ message: 'success', page: apiFeatures.pageNumber, users })

}
export const getUser = async (req, res, next) => {
    let user = await Users.findById(req.params.id)
    user || next(new AppError('this user is not exist', 404))
    !user || res.json({ message: 'success', user })
}
export const updateUser = async (req, res, next) => {
    let user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    { user ? res.json({ message: 'succes', user }) : next(new AppError('this user is not exist', 404)) }

}
export const deleteUser = async (req, res, next) => {
    let user = await Users.findByIdAndDelete(req.params.id, req.body, { new: true })
    { user ? res.json({ message: 'succes', user }) : next(new AppError('this user is not exist', 404)) }

}