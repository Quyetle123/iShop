import express from "express";
import orderController from "../controllers/order.controller.js";

const router = express.Router();

router.post("/addOrder", orderController.addOrder);
router.get("/getOrderByAccountid/:accountid", orderController.getOrderByAccountId);
router.get("/getAllOrder", orderController.getAllOrder);
router.put("/updateStatusOrder/:id", orderController.updateStatusOrder);

export default router;
