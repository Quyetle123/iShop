import express from "express";
import orderDetailController from "../controllers/orderDetail.controller.js";

const router = express.Router();

router.post("/addOrderDetail", orderDetailController.addOrderDetail);

export default router;