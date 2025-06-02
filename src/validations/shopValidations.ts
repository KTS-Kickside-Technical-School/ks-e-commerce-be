import Joi from "joi";

export const newShopValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  logo: Joi.string(),
  images: Joi.array(),
});

export const updateShopValidation = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    "string.min": "Shop name should have at least {#limit} characters",
    "string.max": "Shop name cannot exceed {#limit} characters",
  }),

  description: Joi.string().max(500).allow("").messages({
    "string.max": "Description cannot exceed {#limit} characters",
  }),

  logo: Joi.string().uri().allow("").messages({
    "string.uri": "Logo must be a valid URL",
  }),

  images: Joi.array().items(Joi.string().uri()).max(10).messages({
    "array.max": "Cannot upload more than {#limit} images",
    "string.uri": "Image URLs must be valid",
  }),

  phone: Joi.string().min(10),
  address: Joi.object({
    street: Joi.string().max(100),
    city: Joi.string().max(50),
    state: Joi.string().max(50),
    country: Joi.string().max(50),
    postalCode: Joi.string().max(20),
  }).optional(),
  status: Joi.string().optional(),
});
