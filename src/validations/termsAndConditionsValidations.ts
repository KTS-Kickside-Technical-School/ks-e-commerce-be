import Joi from "joi";

export const newTermsSchema = Joi.object({
    version: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    summary: Joi.string().required(),
    type: Joi.string().required(),
    isActive: Joi.boolean().optional().default(true),
})
