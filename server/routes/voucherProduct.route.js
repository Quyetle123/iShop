import express from "express";
import VoucherProductController from "../controllers/voucherProduct.controller.js";

const router = express.Router();

router.post('/addVoucherAccount', VoucherProductController);

export default router;