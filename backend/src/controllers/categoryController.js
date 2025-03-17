import * as categoryService from "../services/categoryService.js";

export const createNewCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const deleteCat = await categoryService.deleteCategory(req.params.id);
    if (!deleteCat) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(deleteCat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
