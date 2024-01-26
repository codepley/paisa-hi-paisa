import { Router } from "express";
import { getUser, updateUser, userBalance, userSignin, userSignup } from "../controllers/user.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/').put(verifyUser, updateUser)

router.route('/signup').post(userSignup)
router.route('/signin').post(userSignin)
router.route('/my-balance').get(verifyUser, userBalance)
router.route('/bulk').get(getUser)

export default router;