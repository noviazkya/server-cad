import express from "express";
import {
    getAdmin,
    
} from "../controllers/AdminController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/admin", verifyUser, getAdmin);
router.get("/admin/:uuid", verifyUser, getAdmin);

export default router;