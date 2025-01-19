import express from "express";
import VoucherUsageController from "../controllers/voucherUsage.controller.js";

const router = express.Router();

router.post('/addVoucherAccount', VoucherUsageController);

export default router;