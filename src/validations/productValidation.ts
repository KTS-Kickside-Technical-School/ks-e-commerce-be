import Joi from "joi";

export const createProductSchema = Joi.object({
    productName: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
    price: Joi.string().required(),
    category: Joi.string().required(),
    shippingOptions: Joi.object({
        fee: Joi.number().required(),
        note: Joi.string().required(),
        duration: Joi.string().required()
    })
});

export const updateProductSchema = Joi.object({
    productName: Joi.string(),
    description: Joi.string(),
    productImage: Joi.array().items(Joi.string()),
    price: Joi.number(),
    discount: Joi.number(),
    category: Joi.string(),
    status: Joi.string(),
    stock: Joi.number(),
    images: Joi.array().items(Joi.string()).required(),
    shippingOptions: Joi.object({
        fee: Joi.number().required(),
        note: Joi.string().required(),
        duration: Joi.string().required()
    })
})