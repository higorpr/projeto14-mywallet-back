import { sessionsCollection, usersCollection } from "../database/db.js";

export function getWallet(req, res) {
    const user = res.locals.user;

    res.status(200).send(user.wallet);
}

export async function addWalletEntry(req, res) {
    const user = res.locals.user;
    const entry = req.body;

    user.wallet.push(entry);

    try {
        await usersCollection.updateOne({ _id: user._id }, { $set: user });
        console.log(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server failed connection");
    }

    res.status(200).send("Entry added to the wallet");
    // Update wallet with information sent through req.body
}

export function deleteWalletEntry(req, res) {
    const user = res.locals.user;

    // Delete Nth entry on wallet (N = array index)
}

export function updateWalletEntry(req, res) {
    const user = res.locals.user;

    // Updtade Nth entry on wallet (N = array index)
}
