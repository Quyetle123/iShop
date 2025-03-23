import express from "express";
import paymentController from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-payment", paymentController.paymentVNPay);
router.get("/check-payment-vnpay", paymentController.checkPaymentVNPay);

export default router;
