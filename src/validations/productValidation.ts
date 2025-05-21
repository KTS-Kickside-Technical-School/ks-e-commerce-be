import Joi from "joi";

export const createProductSchema = Joi.object({
    productName: Joi.string().required(),  
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),  
    price: Joi.string().required(),
    category: Joi.string().required(),
    size: Joi.string(),
});

export const updateProductSchema = Joi.object({
    productName: Joi.string(),
    productDescription: Joi.string(),
    productImage: Joi.array().items(Joi.string()),
    price: Joi.string(),
    category: Joi.string(),
    size: Joi.string(),
    status: Joi.string()

})