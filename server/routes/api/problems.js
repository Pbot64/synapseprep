import express from 'express';
import { list } from '../../controllers/problemController';

const router = express.Router();

router.get('/list', list);

export default router;
