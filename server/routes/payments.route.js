import express from 'express';
import orderDetailController from '../controllers/payments.controller.js';

const router = express.Router();

router.post('/', orderDetailController.payments);
router.put('/update-info-payment', orderDetailController.updateInfoPayment);
router.get('/get-info-payment-momo', orderDetailController.checkPaymentMomo);
router.get('/get-info-payment-vnpay', orderDetailController.checkPaymentVnpay);

export default router;
