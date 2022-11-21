import joi from "joi";

export const parameterSchema = joi.object({
    idx: joi.number().integer(),
});
