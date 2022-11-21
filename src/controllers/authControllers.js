import { sessionsCollection, usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res) {
    const user = req.body;
    const salt = 10;

    // Generate hash password
    const hashPassword = bcrypt.hashSync(user.password, salt);

    // Create user object
    const userObj = {
        name: user.name,
        email: user.email,
        password: hashPassword,
        wallet: [],
    };

    // Insert user on userCollection
    try {
        await usersCollection.insertOne(userObj);
    } catch (err) {
        console.log(err);
        res.status(404).send("User Database Connection Error");
    }

    res.sendStatus(200);
}

export async function login(req, res) {
    const user = res.locals.user;
    const token = uuidV4();
    const userSession = { token, UserId: user._id };

    // Check if session is in DB
    try {
        const response = await sessionsCollection.findOne({ UserId: user._id });
        // If does not exist, create one
        if (!response) {
            await sessionsCollection.insertOne(userSession);
        // If exists, delete former and create new one
        } else {
            await sessionsCollection.deleteOne({ UserId: user._id });            
            await sessionsCollection.insertOne(userSession);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Falha na conexão com a database.");
    }

    // Send user object to client {name, wallet, token}
    delete user._id
    user.token = token
    res.status(200).send(user);
}
