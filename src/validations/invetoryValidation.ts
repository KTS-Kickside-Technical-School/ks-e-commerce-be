import Joi from "joi";

export const updateInvetorySchema = Joi.object({
    stock: Joi.string().required() 
});
