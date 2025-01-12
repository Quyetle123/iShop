import express from "express";
import VoucherAccountController from "../controllers/voucherAccount.controller.js";

const router = express.Router();

router.post('/addVoucherAccount', VoucherAccountController.addVoucherAccount);

export default router;