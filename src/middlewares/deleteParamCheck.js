import { parameterSchema } from '../models/parameterModel.js';

export function deleteParamCheck (req, res, next) {
    const idx = req.params
    const user = res.locals.user

    // Create possible validation errors
    const validationErrors = parameterSchema.validate(idx, {
        abortEarly: false,
    }).error;

    // Check for sign-up validation errors
    if (validationErrors) {
        const errors = validationErrors.details.map((e) => e.message);
        return res.status(400).send(errors);
    }

    if (Number(idx.idx) >= user.wallet.length) {
        return res.status(400).send('Index out of bounds')
    }

    next()
}