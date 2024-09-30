import express from 'express';
import { addProduct, deleteProduct, getAllProducts, getProductByCategoryId, getProductById, updateProduct } from '../controllers/productCotroller.js';

const router = express.Router();

router.post('/addProduct', addProduct);
router.get('/allProducts', getAllProducts);
router.get('/:id', getProductById);
router.get('/productByCateId/:categoryid', getProductByCategoryId)
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

export default router;