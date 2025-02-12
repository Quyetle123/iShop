import express from "express";
import AdressController from "../controllers/address.controller"

const router = express.router()

router.post('/addAdress', AdressController.addAdress);
router.get('/', AdressController.AllAdresses);
router.get('/:id', AdressController.AdressById);
router.put('/updateAdress/:id', AdressController.updateAdress);
router.delete('/deleteAdress/:id', AdressController.deleteAdress);

export default router;