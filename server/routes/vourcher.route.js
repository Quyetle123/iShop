import express from "express";
import VourcherController from "../controllers/vourcher.controller.js";

const router = express.Router();

router.post('/addVourcher', VourcherController.addVourcher);
router.get('/', VourcherController.allVourchers);
router.get('/:id', VourcherController.vourcherById);
router.put('/updateVourcher/:id', VourcherController.updateVourcher);
router.delete('/:id', VourcherController.deleteVourcher);

export default router;