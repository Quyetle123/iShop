import express from "express";
import productColorController from "../controllers/productColor.controller.js";

const router = express.Router();

router.post('/addProductColor', productColorController.addProductCollor)

export default router;