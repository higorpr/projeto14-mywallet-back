import express, { json } from "express";
import cors from "cors";
import joi from "joi";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

// configs
const app = express();
app.use(json());
app.use(cors());
dotenv.config();

// global variables
const mongoClient = new MongoClient(process.env.MONGO_URI);
const port = 5000
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
app.get("/users", async (req, res) => {});
app.post("/sign-up", async (req, res) => {
    const {name, email, password} = req.body

    const userSchema = joi.object({
        name: joi.string().required(),
        email:joi.string().email().required(),
        password: joi.string().required()
    })

    const validationErrors = userSchema.validate(req.body, {abortEarly:false}).error
    
    if (validationErrors) {
        const errors = validationErrors.details.map((e) => e.message)
        return res.status(400).send(errors)
    }
    res.sendStatus(200)

});
app.post("/login", async (req, res) => {});

app.listen(port, () => console.log(`App running on port ${port}`))