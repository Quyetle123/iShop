import express from 'express';
import storeController from '../controllers/store.controller.js';

const router = express.Router();

router.post('/addStore', storeController.addStore);

export default router;