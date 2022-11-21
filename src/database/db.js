import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);


// mongoDB connection
try {
    await mongoClient.connect();
    console.log("Connected to MongoDB server");
} catch (err) {
    console.log(err);
}

const db = mongoClient.db("myWalletDB");

export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");