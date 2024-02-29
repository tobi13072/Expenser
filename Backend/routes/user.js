import express from "express";
import dotenv from "dotenv";

import userController from "../controllers/user.js";
import validateToken from "../middleware/auth.js";
import userValidators from "../middleware/validators/userValidator.js";

const router = express.Router();
dotenv.config();

router.post("/register", userValidators.registrationValidator, userController.registerUser);

router.post("/login", userValidators.loginValidator, userController.loginUser);

router.get("/current", validateToken, userController.currentUser);

router.delete("/deleteAccount", validateToken, userController.deleteAccount);

router.post("/emailExists", userController.emailExists);

export default router;
