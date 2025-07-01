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

export const sellerOnboardingSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Shop name is required',
    'string.min': 'Shop name must be at least 3 characters',
  }),
  tin: Joi.string().alphanum().min(5).max(20).required().messages({
    'string.empty': 'TIN is required',
  }),
  description: Joi.string().min(10).max(1000).required().messages({
    'string.empty': 'Description is required',
  }),
  rdbDocument: Joi.string().uri().required().messages({
    'string.uri': 'RDB Document must be a valid URL',
    'string.empty': 'RDB Document URL is required',
  }),

  seller: Joi.object({
    fullNames: Joi.string().min(3).max(100).required().messages({
      'string.empty': 'Seller full names are required',
    }),
    phone: Joi.string()
      .pattern(/^(\+?250|0)?7[2389]\d{7}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone must be a valid Rwandan number',
        'string.empty': 'Phone is required',
      }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be valid',
      'string.empty': 'Email is required',
    }),
    idDocument: Joi.string().uri().required().messages({
      'string.uri': 'ID Document must be a valid URL',
      'string.empty': 'ID Document is required',
    }),
    addresses: Joi.string().min(3).required().messages({
      'string.empty': 'Address is required',
    }),
  }).required(),

  payment: Joi.object({
    mobilePayment: Joi.string().min(10).max(20).required().messages({
      'string.empty': 'Mobile payment number is required',
    }),
    bankName: Joi.string().min(2).max(100).required().messages({
      'string.empty': 'Bank name is required',
    }),
    accountNumber: Joi.string().min(5).max(30).required().messages({
      'string.empty': 'Bank account number is required',
    }),
  }).required(),
});
