import { Router } from "express";
import { addWalletEntry, deleteWalletEntry, getWallet, updateWalletEntry } from "../controllers/userControllers.js";
import { retrieveUserFromToken } from "../middlewares/retrieveUserFromToken.js";
import { walletEntryValidation } from '../middlewares/walletEntryValidation.js';

const userRouter = Router();
userRouter.use(retrieveUserFromToken)
userRouter.get("/wallet", getWallet);
userRouter.post("/walletEntry", walletEntryValidation, addWalletEntry);
userRouter.put('/walletEntry', updateWalletEntry)
userRouter.delete('/walletEntry', deleteWalletEntry)

export default userRouter;
