import express from 'express';
import problemController from '../../controllers/problemController';

const router = express.Router();
router.get('/list', (req, res) => {
  return problemController.list(req, res);
});

export default router;
