import express from "express";
import {
    createNewCategory,
    getAllCategories,
    getCategory,
    deleteCategoryById,
} from "../controllers/categoryController.js"
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNewCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.delete("/:id", protect, deleteCategoryById);

export default router;