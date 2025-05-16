import Joi from "joi";

export const newShopValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    logo: Joi.string(),
    images: Joi.array()
})