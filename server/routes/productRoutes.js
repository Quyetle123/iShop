import express from 'express';
import productController from '../controllers/productCotroller.js';

const router = express.Router();

router.post('/addProduct', productController.addProduct);
router.get('/allProducts', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/productByCateId/:categoryid', productController.getProductByCategoryId)
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

export default router;