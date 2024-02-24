import express from "express";
import { Login, Me , registerAdmin} from "../controllers/AuthController.js";
import { verifyAdmin } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/auth/me", verifyAdmin, Me);
router.post("/auth/login", Login);
router.post("/auth/register", registerAdmin);

export default router;
