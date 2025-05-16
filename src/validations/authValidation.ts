import Joi from "joi";

export const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const resendTokenSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  
export const userResetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().required()
})