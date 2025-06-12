import Joi from "joi";

export const newLocationSchema = Joi.object({
    country: Joi.string().required().min(3).messages({
        "string.empty": "Country is required",
        "string.min": "Country must be at least 3 characters long",
        "any.required": "Country is required"
    }),
    code: Joi.string().required().min(2).max(10).messages({
        "string.empty": "Code is required",
        "string.min": "Code must be at least 2 characters long",
        "string.max": "Code must not exceed 10 characters"
        , "any.required": "Code is required"
    }),
    city: Joi.string().required().min(2).messages({
        "string.empty": "City is required",
        "string.min": "City must be at least 2 characters long",
        "any.required": "City is required"
    })
})

export const updateLocationSchema = Joi.object({
    country: Joi.string().min(3).messages({
        "string.empty": "Country cannot be empty",
        "string.min": "Country must be at least 3 characters long"
    }),
    code: Joi.string().min(2).max(10).messages({
        "string.empty": "Code cannot be empty",
        "string.min": "Code must be at least 2 characters long",
        "string.max": "Code must not exceed 10 characters"
    }),
    city: Joi.string().min(2).messages({
        "string.empty": "City cannot be empty",
        "string.min": "City must be at least 2 characters long"
    })
})

