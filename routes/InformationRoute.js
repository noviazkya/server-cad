// routes.js
import express from 'express';
import {
  getInformation,
  getInformationById,
  createInformation,
  updateInformation,
  deleteInformation,

} from '../controllers/InformationController.js';
import { verifyAdmin } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/information', getInformation);
router.get('/information/:uuid', getInformationById);
router.post('/information/create', verifyAdmin, createInformation);
router.put('/information/update/:uuid', verifyAdmin, updateInformation);
router.delete('/information/delete/:uuid', verifyAdmin, deleteInformation);

export default router;
