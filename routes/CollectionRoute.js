import express from "express";
import {
  getCollection,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/CollectionsController.js";
import { verifyAdmin } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/collections", getCollection);
router.get("/collections/:uuid", getCollectionById);
router.post("/collections/create", verifyAdmin, createCollection);
router.put("/collections/update/:uuid", verifyAdmin, updateCollection);
router.delete("/collections/delete/:uuid", verifyAdmin, deleteCollection);

export default router;
