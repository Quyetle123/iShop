import express from "express";
import productColorController from "../controllers/productColor.controller.js";

const router = express.Router();

router.post('/addProductColor', productColorController.addProductCollor);
router.get('/', productColorController.getAllProductColors);
router.get('/:id', productColorController.getProductColorById);

export default router;