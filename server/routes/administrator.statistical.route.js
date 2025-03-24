import express from "express";
import AdministratorStatisticalController from "../controllers/administrator.statistical.controller.js";

const router = express.Router();

router.get("/general", AdministratorStatisticalController.generalStatistics);
router.get(
  "/order-month",
  AdministratorStatisticalController.getOrderStatisticMonth
);

export default router;
