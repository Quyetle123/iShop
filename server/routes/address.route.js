import express from "express";
import AdressController from "../controllers/address.controller.js"

const router = express.Router()

router.post('/addAdress', AdressController.addAdress);
router.get('/', AdressController.AllAdresses);
router.get('/main/:accountid', AdressController.MainAddress);
router.post('/addMainAdress', AdressController.addMainAddress);
router.put('/updateMainAdress/:id', AdressController.updateMainAddress);
router.get('/:id', AdressController.AdressById);
router.get('/user/:accountid', AdressController.AddressByAccountId);
router.put('/updateAdress/:id', AdressController.updateAdress);
router.delete('/deleteAdress/:id', AdressController.deleteAdress);

export default router;