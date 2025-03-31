import express from 'express';
import storeController from '../controllers/store.controller.js';

const router = express.Router();

router.post('/addStore', storeController.addStore);
router.get('/:id', storeController.getStorebyId);
router.put('/status/:id', storeController.updateStatusStore);

export default router;
