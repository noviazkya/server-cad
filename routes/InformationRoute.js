import express from 'express';
import {
  getInformation,
  getInformationById,
  createInformation,
  addTagsForInformation,
  deleteTagsForInformation,
} from '../controllers/InformationController.js';

const router = express.Router();

router.get('/information', getInformation);
router.get('/information/:uuid', getInformationById);
router.post('/information', createInformation);
router.post('/information/:uuid/tags', addTagsForInformation);
router.delete('/information/:uuid/tags', deleteTagsForInformation);

export default router;
