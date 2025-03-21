import express from "express";
import InventoryHistoryController from "../controllers/inventoryHistory.controller.js";

const router = express.Router();

router.post("/", InventoryHistoryController.addInventoryHistory);
router.get(
  "/:storeid",
  InventoryHistoryController.getInventoryHistoryByStoreId
);

export default router;
