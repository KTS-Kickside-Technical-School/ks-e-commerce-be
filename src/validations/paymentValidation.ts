import Joi from 'joi';

export const stripePaymentValidation = Joi.object({
  shippingAddress: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
      country: Joi.string().required(),
  })
})


export const singleProductStripePaymentValidation = Joi.object({
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
    finalUnitPrice: Joi.number().positive().precision(2).required(),
    discount: Joi.number().min(0).max(100).default(0),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    finalTotalPrice: Joi.number().positive().precision(2).required(),
    originalPrice: Joi.number().positive().precision(2).required(),
    productName: Joi.string().min(3).max(100).required(),
    addresses: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        region: Joi.string().required(),
        postalCode: Joi.string().pattern(/^[0-9]+$/).required(),
        country: Joi.string().required(),
    }).required(),
    currency: Joi.string().valid('rwf').default('rwf'),
    orderStatus: Joi.string()
        .valid("Pending", "Paid", "Shipped", "Delivered", "Cancelled")
        .default("Pending")
});