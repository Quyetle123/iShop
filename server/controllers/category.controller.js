import {
  Category,
  Product,
  ProductColor,
  ProductImage,
} from "../models/index.js";

class categoryController {
  static async addCategory(req, res) {
    const data = req.body;
    try {
      const category = await Category.create(data);
      res.status(200).json({ category });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll({
        include: {
          model: Product,
          include: {
            model: ProductColor,
            separate: true,
            order: [["createdAt", "ASC"]],
            include: [
              {
                model: ProductImage,
                separate: true,
                order: [["createdAt", "ASC"]],
              },
            ],
          },
        },
      });
      res.status(200).json({ categories });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findAll({
        where: {
          id,
        },
        include: {
          model: Product,
          include: {
            model: ProductColor,
            separate: true,
            order: [["createdAt", "ASC"]],
            include: [
              {
                model: ProductImage,
                separate: true,
                order: [["createdAt", "ASC"]],
              },
            ],
          },
        },
      });
      if (category) {
        res.status(200).json({ category });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateCategory(req, res) {
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
  }

  static async deleteCategory(req, res) {
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
  }

  static async producStatistics(req, res) {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
            include: [{ model: ProductColor }],
          },
        ],
      });

      if (!categories || categories.length === 0) {
        return res.status(200).json({ labels: [], datasets: [] });
      }

      let labels = [];
      let soldData = [];
      let stockData = [];

      categories.forEach((category) => {
        let quantitySold = 0;
        let quantity = 0;

        if (Array.isArray(category.Products)) {
          category.Products.forEach((product) => {
            if (Array.isArray(product.ProductColors)) {
              product.ProductColors.forEach((color) => {
                quantitySold += parseFloat(color.sold || 0);
                quantity += parseFloat(color.quantity || 0);
              });
            }
          });
        }

        labels.push(category.categoryname);
        soldData.push(quantitySold);
        stockData.push(quantity);
      });

      const productData = {
        labels,
        datasets: [
          {
            label: "Đã bán",
            data: soldData,
            backgroundColor: "#1890ff",
          },
          {
            label: "Tồn kho",
            data: stockData,
            backgroundColor: "#ff4d4f",
          },
        ],
      };

      return res.status(200).json(productData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default categoryController;
