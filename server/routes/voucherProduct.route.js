import express from "express";
import VoucherProductController from "../controllers/voucherProduct.controller.js";

const router = express.Router();

router.post('/addVoucherProduct', VoucherProductController.addVoucherProduct);
router.get('/', VoucherProductController.allVoucherProducts);
router.get('/:id', VoucherProductController.voucherProductById);

export default router;