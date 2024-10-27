import express from "express";
import notifyController from "../controllers/notify.controller.js";

const router = express.Router();

router.post("/addNotify", notifyController.addNotitfy);
router.get("/:accountid", notifyController.getNotifyByAccountId);
router.delete("/deleteNotify/:id", notifyController.deleteNotify);

export default router;
