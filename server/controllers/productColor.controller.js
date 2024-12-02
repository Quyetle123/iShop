import { Product, ProductColor, ProductImage } from "../models/index.js";

class productColorController {
  static async addProductCollor(req, res) {
    const data = req.body;
    try {
      const productColor = await ProductColor.create(data);
      res.status(200).json({ productColor });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllProductColors(req, res) {
    try {
      const productColors = await ProductColor.findAll();
      res.status(200).json({ productColors });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getProductColorById(req, res) {
    const { id } = req.params;
    try {
      const productColor = await ProductColor.findOne({
        where: {
          id,
        },
        include: [{ model: Product }, { model: ProductImage }],
      });
      if (productColor) {
        res.status(200).json({ productColor });
      } else {
        res.status(404).json({ message: "ProductColor not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default productColorController;
