import Joi from "joi";

export const addSingleProductOrderProcess = Joi.object({
    _id: Joi.string().required(),
    orderStatus: Joi.string().valid("Pending", "Paid", "Shipped", "Delivered", "Cancelled"),
    process: Joi.string().required(), // Moved from nested object
    date: Joi.date().required(),
    images: Joi.array().items(Joi.string()).optional(),
    courier: Joi.when('orderStatus', {
        is: 'Shipped',
        then: Joi.string().required(),
        otherwise: Joi.string().optional()
    })
});