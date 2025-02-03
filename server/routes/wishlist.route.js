import express from "express";
import wishlistController from "../controllers/wishlist.controller.js";

const router = express.Router();

router.post("/addWishlist",wishlistController.addWishlist);
router.get("/:accountid", wishlistController.getWishlistById);
router.delete("/deleteWishlist/:id", wishlistController.deleteWishlist);

export default router;
