import express from 'express';
import { getBalance, transferMoney } from '../controllers/account.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.route('/balance').get(verifyUser, getBalance)
router.route('/transfer').post(verifyUser, transferMoney)

export default router