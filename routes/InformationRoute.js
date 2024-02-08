// routes.js
import express from 'express';
import {
  getInformation,
  getInformationById,
  createInformation,
  updateInformation,
  deleteInformation,
  updateTagsForInformation,
  deleteTagsForInformation,
  addTagsForInformation, // Tambahkan ini untuk endpoint baru
} from '../controllers/InformationController.js';
import { verifyAdmin } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/information', getInformation);
router.get('/information/:uuid', getInformationById);
router.post('/information/create', verifyAdmin, createInformation);
router.put('/information/update/:uuid', verifyAdmin, updateInformation);
router.delete('/information/delete/:uuid', verifyAdmin, deleteInformation);
router.put('/information/tags/:uuid', verifyAdmin, updateTagsForInformation);
router.delete('/information/tags/delete/:uuid', verifyAdmin, deleteTagsForInformation);
router.put('/information/tags/add/:uuid', verifyAdmin, addTagsForInformation);

export default router;
