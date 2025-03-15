import express from "express";
import WardController from "../controllers/ward.controller.js";

const router = express.Router();

router.get("/:district_id", WardController.getWardByDistrictId);

export default router;