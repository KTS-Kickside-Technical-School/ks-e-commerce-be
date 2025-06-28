import Joi from "joi";

export const saveFeaturedShopValidations = Joi.object({
    shopId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required()
})