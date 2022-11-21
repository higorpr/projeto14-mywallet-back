import joi from 'joi';

export const entrySchema = joi.object({
    name:joi.string().required().min(3),
    value: joi.number().required(),
    date: joi.date().iso().required()
})
