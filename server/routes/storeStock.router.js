import express from 'express';
import StoreStockController from '../controllers/storeStock.controller.js';

const router = express.Router();

router.post('/initialize-store-stock', StoreStockController.initializeStoreStock);
router.post('/sync-new-products-to-stores', StoreStockController.syncNewProductsToStore);
router.get('/', StoreStockController.getAllStoreStock);
router.get('/:storeid', StoreStockController.getStoreStock);
router.put('/:storeid', StoreStockController.updateQuantityStoreStock);
router.get('/statistics/:storeid', StoreStockController.producStatistics);

export default router;
