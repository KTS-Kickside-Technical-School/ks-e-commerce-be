import Joi from "joi";

export const newUserSchema = Joi.object({
    fullNames: Joi.string().optional(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    profilePicture: Joi.string().optional(),
    role: Joi.string().valid("seller", "customer"),
    bio: Joi.string().optional(),
})


export const updateUserSchema = Joi.object({
    _id: Joi.string().required(),
    fullNames: Joi.string(),
    email: Joi.string(),
    profile: Joi.string(),
    phone: Joi.string(),
    bio: Joi.string()
})


export const createUserSchema = Joi.object({
    fullNames: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    profilePicture: Joi.string().optional(),
    role: Joi.string().required().valid("admin", "seller", "customer"),
    bio: Joi.string().optional(),
    phone: Joi.string().required()

});

export const userDisableSchema = Joi.object({
    _id: Joi.string().required(),
    disableReason: Joi.string().required()
});

export const addressSchema = Joi.object({
    _id: Joi.string().optional(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    region: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    coordinates: Joi.array()
        .items(Joi.number().required(), Joi.number().required())
        .length(2)
        .optional(),
    isPrimary: Joi.boolean().default(false)
});

export const userUpdateProfileSchema = Joi.object({
    _id: Joi.string().required(),
    fullNames: Joi.string().optional(),
    email: Joi.string()
        .email()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .optional(),
    profile: Joi.string().optional().allow(null),
    phone: Joi.string()
        .optional()
        .allow(null),
    bio: Joi.string().optional().allow(null),
    addresses: Joi.array().items(addressSchema).optional(),
    isDisabled: Joi.boolean().optional(),
    isEmailVerified: Joi.boolean().optional(),
    isUserVerified: Joi.boolean().optional()
}).min(1);