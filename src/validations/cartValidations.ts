import Joi from "joi"

export const addProductToCart = Joi.object({
    product: Joi.string().required()
})

export const updateCartProduct = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number()
})