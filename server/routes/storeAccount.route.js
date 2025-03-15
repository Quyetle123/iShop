import express from "express";
import storeAccountController from "../controllers/storeAccount.controller.js";

const router = express.Router();

router.post('/addStoreAccount', storeAccountController.addAccountStore);
router.get('/:accountid', storeAccountController.getAccountStorebyAccountId);

export default router