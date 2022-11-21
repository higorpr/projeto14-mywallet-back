import { entrySchema } from "../models/entryModel.js"

export function walletEntryValidation(req, res, next) {
    const entry = req.body

    // Create possible validation errors
    const validationErrors = entrySchema.validate(entry, {
        abortEarly: false,
    }).error;

    // Check for sign-up validation errors
    if (validationErrors) {
        const errors = validationErrors.details.map((e) => e.message);
        return res.status(400).send(errors);
    }

    next()

}
