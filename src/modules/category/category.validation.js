import Joi from "joi";


export const categoryValidation = Joi.object({
    name: Joi.string().required().max(20).min(3),
    image: Joi.object().required()
})