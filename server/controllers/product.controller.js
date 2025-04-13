import {
  Account,
  Color,
  Comment,
  Product,
  ProductColor,
  ProductImage,
} from "../models/index.js";

class productController {
  static async addProduct(req, res) {
    const {productid,
      productname,
      description,
      price,
      categoryid,
      productColorid,
      quantity,
      colorid,
      sortedUrls} = req.body;
    try {
      const products = await Product.create({id: productid, productname, description, price, categoryid});
      const productColor = await ProductColor.create({id: productColorid, productid, quantity, sold: 0, colorid});
      const productImage = await ProductImage.bulkCreate(sortedUrls.map((image) => ({productColorid, image})));
      res.status(200).json({ products, productColor, productImage });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: {
          model: ProductColor,
          include: [
            {
              model: ProductImage,
            },
            {
              model: Color,
            },
          ],
        },
      });
      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getProductByCategoryId(req, res) {
    const { categoryid } = req.params;
    try {
      const products = await Product.findAll({
        where: { categoryid },
        include: {
          model: ProductColor,
          include: [
            {
              model: ProductImage,
            },
            {
              model: Color,
            },
          ],
        },
        // order: [["quantity", "DESC"]],
      });
      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Comment,
            include: {
              model: Account,
            },
          },
          {
            model: ProductColor,
            separate: true,
            order: [["createdAt", "ASC"]],
            include: [
              {
                model: ProductImage,
                separate: true,
                order: [["createdAt", "ASC"]],
              },
              {
                model: Color,
              },
            ],
          },
        ],
      });
      if (product) {
        res.status(200).json({ product });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const product = await Product.findByPk(id);
      if (product) {
        await product.update(data);
        res.status(200).json({ product });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (product) {
        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}

export default productController;
