import express from 'express';
import problemController from '../../controllers/problemController';

const router = express.Router();

router.get('problems', problemController.list);

export default router;
