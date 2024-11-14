import express from "express"
import ProductImageController from "../controllers/productImage.controller.js";

const router = express.Router();

router.post('/addProductImage', ProductImageController.addProductImage)

export default router