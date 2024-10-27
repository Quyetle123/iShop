import { Category, Product } from "../models/index.js";

class categoryController {
  static async addCategory (req, res) {
    const data = req.body;
    try {
      const category = await Category.create(data);
      res.status(200).json({ category });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  static async getAllCategories (req, res) {
    try {
      const categories = await Category.findAll({
        include: {
          model: Product,
        }
      });
      res.status(200).json({ categories });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  static async getCategoryById (req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findAll({
        where: {
          id
        },
        include: {
          model: Product
        }
      });
      if (category) {
        res.status(200).json({ category });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  static async updateCategory (req, res) {
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
  
  static async deleteCategory (req, res) {
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
  
}

export default categoryController