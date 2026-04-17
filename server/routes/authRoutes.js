import express from 'express';
import { signin, signup ,googleAuth,logout} from '../controllers/authController.js';

const router = express.Router();

router.post('/google', googleAuth);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);

export default router;