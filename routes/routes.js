import express from 'express';
import { login, secureData } from '../controller/controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/secure-data', authenticateToken, secureData);

export default router;
