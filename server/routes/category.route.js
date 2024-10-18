import express from "express";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

router.post('/addCategory', categoryController.addCategory);
router.get('/allCategories', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/updateCategory/:id', categoryController.updateCategory);
router.delete('/deleteCategory/:id', categoryController.deleteCategory);

export default router