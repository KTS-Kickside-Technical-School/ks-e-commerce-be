import Joi from "joi";

export const productSuggestionSchema = Joi.object({
    productSuggestionName: Joi.string().required(),
    productSuggestionImage: Joi.string(),
    description: Joi.string(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required()
});

export const updateSuggestionSchema = Joi.object({
    productSuggestionName: Joi.string(),
    productSuggestionImage: Joi.string(),
    description: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string()
})