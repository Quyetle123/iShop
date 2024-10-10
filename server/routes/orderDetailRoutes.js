import express from "express";
import orderDetailController from "../controllers/orderDetailController.js";

const router = express.Router();

router.post("/addOrderDetail", orderDetailController.addOrderDetail);

export default router;