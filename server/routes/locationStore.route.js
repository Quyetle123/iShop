import express from "express";
import locationStoreController from "../controllers/locationStore.controller.js";

const router = express.Router();

router.get("/", locationStoreController.getAllLocationStore);

export default router;
