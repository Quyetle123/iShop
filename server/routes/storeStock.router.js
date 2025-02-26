import express from "express";
import StoreStockController from "../controllers/storeStock.controller.js";

const router = express.Router();

router.post('/initialize-store-stock', StoreStockController.initializeStoreStock);
router.get('/:storeid', StoreStockController.getStoreStock);

export default router;