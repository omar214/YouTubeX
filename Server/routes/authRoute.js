import express from 'express';
const router = express.Router();
import { googleAuth, login, singup } from '../controllers/authController.js';
import verifyAuth from '../middlewares/authMiddlware.js';


router.post('/signup', singup);

router.post('/login', login);


router.post('/googleAuth', googleAuth);


export default router;