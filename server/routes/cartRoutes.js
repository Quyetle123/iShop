import express, { Router } from "express";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router.post("/addCart",cartController.addCart);
router.get("/:accountid", cartController.getCartById);
router.put("/updateQuantity/:id", cartController.updateQuantity);
router.delete("/deleteCart/:id", cartController.deleteCart);

export default router;
