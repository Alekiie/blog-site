import express from "express";
import { register, login, getUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.get("/profile", protect, getUser);

export default router;