import express from "express";
import AuthController  from "../controllers/account.controller.js";

const router = express.Router()

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/', AuthController.getAccounts);

export default router;