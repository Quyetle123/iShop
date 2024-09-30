import Category from "../models/Category.js";

export const addCategory = async (req, res) => {
  const data = req.body;
  try {
    const category = await Category.create(data);
    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      res.status(200).json({ category });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.update(data);
      res.status(200).json({ category });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Category not found" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
