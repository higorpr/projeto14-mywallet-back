import { Router } from "express";
import { addWalletEntry, deleteWalletEntry, getWallet, updateWalletEntry } from "../controllers/userControllers.js";
import { deleteParamCheck } from "../middlewares/deleteParamCheck.js";
import { retrieveUserFromToken } from "../middlewares/retrieveUserFromToken.js";
import { walletEntryValidation } from '../middlewares/walletEntryValidation.js';

const userRouter = Router();
userRouter.use(retrieveUserFromToken)
userRouter.get("/wallet", getWallet);
userRouter.post("/walletEntry", walletEntryValidation, addWalletEntry);
userRouter.delete('/walletEntry/:idx', deleteParamCheck, deleteWalletEntry)
userRouter.put('/walletEntry', updateWalletEntry)

export default userRouter;
