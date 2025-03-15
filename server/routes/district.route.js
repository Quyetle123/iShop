import express from "express";
import districtController from "../controllers/district.controller.js";

const router = express.Router();

router.get("/:province_id", districtController.getDistrictByProvinceId);

export default router;