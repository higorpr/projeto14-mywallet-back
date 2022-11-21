import { usersCollection } from "../database/db.js";

export async function userCreationValidation(req, res, next) {
    const user = req.body;

    try {
        const targetUser = await usersCollection.findOne({ email: user.email });
        if (targetUser) {
            return res.status(409).send("Email already in use");
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send("Could not connect to the database server");
    }

    next();
}
