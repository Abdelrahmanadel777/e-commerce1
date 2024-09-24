import Joi from "joi"
import { AppError } from "../utils/AppError.js"



export const validate = (schema) => {
    return (req, res, next) => {
        let errBox = []
        let { error } = schema.validate({ image: req.file, ...req.body, ...req.params, ...req.query })
        if (!error) return next()
            
        error.details.map(err=> errBox.push(err.message))
        next(new AppError(errBox, 404))
        
    }
}