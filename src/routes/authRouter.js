import { Router } from "express";
import { login, signUp } from "../controllers/authControllers.js";
import { userCreationValidation } from "../middlewares/userCreationValidation.js";
import { userValidation } from "../middlewares/userValidation.js";
import { loginInfoValidation } from '../middlewares/loginInfoValidation.js';
import { loginValidation } from "../middlewares/loginValidation.js";

const authRouter = Router();
// authRouter.use(userValidation);
authRouter.post("/sign-up", userValidation, userCreationValidation, signUp);
authRouter.post("/login", loginInfoValidation, loginValidation, login);

export default authRouter;
