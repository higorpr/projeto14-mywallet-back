import { sessionsCollection, usersCollection } from "../database/db.js";

export async function retrieveUserFromToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "").trim();
    let user;

    try {
        const userSession = await sessionsCollection.findOne({ token: token });

        if (!userSession) {
            return res.status(404).send("Invalid token");
        }

        user = await usersCollection.findOne({ _id: userSession.UserId });
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Database connection failed");
    }

    res.locals.user = user;
    next();
}
