import bcrypt from "bcrypt";
import { usersCollection } from "../database/db.js";

export async function loginValidation(req, res, next) {
    const loginInfo = req.body;
    let user;

    try {
        user = await usersCollection.findOne({ email: loginInfo.email });

        const passwordCheck = bcrypt.compareSync(
            loginInfo.password,
            user.password
        );

        if (!passwordCheck) {
            return res.status(401).send("E-mail ou senha incorretos.");
        }
    } catch (err) {
        return res
            .status(404)
            .send("Este e-mail não corresponde a um usuário cadastrado.");
    }

    delete user.password
    delete user.email
    res.locals.user = user;

    next();
}
