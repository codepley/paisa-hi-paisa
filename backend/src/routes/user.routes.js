import { Router } from "express";
import { userBalance, userSignin, userSignup } from "../controllers/user.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/signup').post(userSignup)
router.route('/signin').post(userSignin)
router.route('/my-balance').get(verifyUser, userBalance)

export default router;