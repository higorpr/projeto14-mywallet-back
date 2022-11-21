import { loginSchema } from "../models/loginModel.js";

export function loginInfoValidation(req, res, next) {
    const loginInfo = req.body;

    const validationErrors = loginSchema.validate(loginInfo, {
        abortEarly: false,
    }).error;

    if (validationErrors) {
        const errors = validationErrors.details.map((e) => e.message);
        return res.status(400).send(errors);
    }

    next();
}
