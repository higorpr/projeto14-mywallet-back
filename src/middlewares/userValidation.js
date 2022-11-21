import { userSchema } from "../models/userModel.js";


export function userValidation(req, res, next) {
    const user = req.body;

    // Create possible validation errors
    const validationErrors = userSchema.validate(user, {
        abortEarly: false,
    }).error;

    // Check for sign-up validation errors
    if (validationErrors) {
        const errors = validationErrors.details.map((e) => e.message);
        return res.status(400).send(errors);
    }

    next()
}
