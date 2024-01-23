import { Router } from "express";
const router = Router();

router.route('/').get((req, res) => {
   console.log("hello");
   res.send('hello')
})

export default router;