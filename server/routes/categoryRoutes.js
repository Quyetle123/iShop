import express from "express";
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post('/addCategory', addCategory);
router.get('/allCategories', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/updateCategory/:id', updateCategory);
router.delete('/deleteCategory/:id', deleteCategory);

export default router