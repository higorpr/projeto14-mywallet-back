import { sessionsCollection, usersCollection } from "../database/db.js";

export function getWallet(req, res) {
    const user = res.locals.user;

    res.status(200).send(user.wallet);
}

export async function addWalletEntry(req, res) {
    const user = res.locals.user;
    const entry = req.body;

    entry.date = Date.now()
    console.log(entry);

    user.wallet.push(entry);

    try {
        await usersCollection.updateOne(
            { _id: user._id },
            { $set: user }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server failed connection");
    }

    res.status(200).send("Entry added to the wallet");
    // Update wallet with information sent through req.body
}

export async function deleteWalletEntry(req, res) {
    const user = res.locals.user;
    const {idx} = req.params;
    console.log(user.wallet[idx])
    console.log(user.wallet)

    user.wallet.splice(idx,1)
    console.log(user.wallet)

    try {
        await usersCollection.updateOne(
            { _id: user._id },
            { $set: user }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server failed connection");
    }
    res.status(200).send('Entry deleted from the wallet')
    // Delete Nth entry on wallet (N = array index)
}

export async function updateWalletEntry(req, res) {
    const user = res.locals.user;

    // Updtade Nth entry on wallet (N = array index)
}
