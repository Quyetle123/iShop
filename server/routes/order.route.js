import express from 'express';
import orderController from '../controllers/order.controller.js';

const router = express.Router();

router.post('/addOrder', orderController.addOrder);
router.get('/orderDraft/:accountid', orderController.getOrderDraft);
router.get('/getOrderByAccountid/:accountid', orderController.getOrderByAccountId);
router.get('/getAllOrder', orderController.getAllOrder);
router.get('/orderById/:id', orderController.getOrderById);
router.get('/orderStatus/:storeid', orderController.getOrdersByStatus);
router.put('/new/:id', orderController.newOrder);
router.put('/updateStatusOrder/:id', orderController.updateStatusOrder);
router.get('/statistics/:storeid', orderController.getOrderStatistics);
router.get('/month/:storeid', orderController.getOrderStatisticMonth);

export default router;
