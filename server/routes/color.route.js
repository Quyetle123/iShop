import express from "express";
import colorController from "../controllers/color.controller.js";

const router = express.Router();

router.get("/", colorController.getAllColor);
router.post("/addColor", colorController.addColor);

export default router;