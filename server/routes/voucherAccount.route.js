import express from "express";
import VoucherAccountController from "../controllers/voucherAccount.controller.js";

const router = express.Router();

router.post('/addVoucherAccount', VoucherAccountController.addVoucherAccount);
router.get('/', VoucherAccountController.allVoucherAccount);
router.get('/:id', VoucherAccountController.voucherAccountById);

export default router;