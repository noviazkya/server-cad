import express from "express";
import {
    getAdmin,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
} from "../controllers/AdminController.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/admin", verifyAdmin, getAdmin);
router.get("/admin/:uuid", verifyAdmin, getAdminById);
router.post("/admin/create", createAdmin);
router.patch("/admin/update/:uuid", verifyAdmin, updateAdmin);
router.delete("/admin/delete/:uuid", verifyAdmin, deleteAdmin);

export default router;