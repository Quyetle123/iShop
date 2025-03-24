import express from 'express';
import AuthController from '../controllers/account.controller.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/loginWithGoogle', AuthController.loginWithGoogle);
router.get('/', AuthController.getAccounts);
router.post('/send-mail-account', AuthController.sendMailVerifyEmail);

export default router;
