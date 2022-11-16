import express, { json } from "express";
import cors from "cors";
import joi from "joi";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";

// configs
const app = express();
app.use(json());
app.use(cors());
dotenv.config();

// global variables
const mongoClient = new MongoClient(process.env.MONGO_URI);
const port = 5000;
const salt = 10;
let db;
let sessionsCollection;
let usersCollection;

// mongoDB connection
try {
    await mongoClient.connect();
    console.log("Connected to MongoDB server");
    db = mongoClient.db("myWalletDB");
    usersCollection = db.collection("users");
    sessionsCollection = db.collection("sessions");
} catch (err) {
    console.log(err);
}

// routes
app.post("/sign-up", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const targetUser = await usersCollection.findOne({ email: email });
        if (targetUser) {
            return res.status(409).send("Email already in use");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Could not connect to the database server");
    }
    // Create sign-up user schema
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    // Create possible validation errors
    const validationErrors = userSchema.validate(req.body, {
        abortEarly: false,
    }).error;

    // Check for sign-up validation errors
    if (validationErrors) {
        const errors = validationErrors.details.map((e) => e.message);
        return res.status(400).send(errors);
    }

    // Generate hash password
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create user object
    const user = { name, email, password: hashPassword, wallet: [] };

    // Insert user on userCollection
    try {
        await usersCollection.insertOne(user);
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(404).send("It was not possible to register the user");
    }

    res.sendStatus(200);
});
app.post("/login", async (req, res) => {});


app.listen(port, () => console.log(`App running on port ${port}`));
