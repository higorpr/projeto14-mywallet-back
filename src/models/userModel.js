import joi from 'joi'

// Create sign-up user schema
export const userSchema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().required(),
});