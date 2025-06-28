import Joi from 'joi';

export const saveOrderValidations = Joi.object({
    product: Joi.string(),
    productName: Joi.string(),
    productImages: Joi.array().items(Joi.string()),
    quantity: Joi.number(),
    originalPrice: Joi.number(),
    finalUnitPrice: Joi.number(),
    discount: Joi.number(),
    finalTotalPrice: Joi.number(),

    shippingOptions: Joi.object({
        fee: Joi.number(),
        note: Joi.string().allow('', null),
        duration: Joi.string().allow('', null),
    }),

    shippingAddress: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        region: Joi.string(),
        postalCode: Joi.string(),
        country: Joi.string(),
    }),

    contactInfo: Joi.object({
        phone: Joi.string(),
        email: Joi.string().email().allow('', null),
    }),

    paymentMethod: Joi.string()
        .valid('momo', 'visa', 'stripe', 'cash', 'paypal')
    ,

    paymentProof: Joi.string().allow('', null),


    paidAt: Joi.date().allow(null),
    deliveredAt: Joi.date().allow(null),

    orderTrackingHistory: Joi.array().items(
        Joi.object({
            status: Joi.string(),
            note: Joi.string().allow('', null),
            timestamp: Joi.date(),
        })
    ).default([]),
});

export const updateOrderValidations = Joi.object({
    product: Joi.string(),
    productName: Joi.string(),
    productImages: Joi.array().items(Joi.string()),
    quantity: Joi.number(),
    originalPrice: Joi.number(),
    finalUnitPrice: Joi.number(),
    discount: Joi.number(),
    finalTotalPrice: Joi.number(),

    shippingOptions: Joi.object({
        fee: Joi.number(),
        note: Joi.string().allow('', null),
        duration: Joi.string().allow('', null),
    }),

    shippingAddress: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        region: Joi.string(),
        postalCode: Joi.string(),
        country: Joi.string(),
    }),

    contactInfo: Joi.object({
        phone: Joi.string(),
        email: Joi.string().email().allow('', null),
    }),

    paymentMethod: Joi.string()
        .valid('momo', 'visa', 'stripe', 'cash', 'paypal')
    ,

    paymentProof: Joi.string().allow('', null),


    paidAt: Joi.date().allow(null),
    deliveredAt: Joi.date().allow(null),

    orderTrackingHistory: Joi.object({
        status: Joi.string(),
        note: Joi.string().allow('', null),
        timestamp: Joi.date(),
    }).required(),
    orderStatus: Joi.string()
});


