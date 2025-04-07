import express from 'express';
import CompanyAccountController from '../controllers/companyAccount.controller.js';

const router = express.Router();

router.get('/:accountid', CompanyAccountController.getAccountCompanyByAccountId);

export default router;
