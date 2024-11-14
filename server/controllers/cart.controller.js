import { Cart, Account, Product, ProductColor, ProductImage, Color } from "../models/index.js";

class cartController {
  static async addCart(req, res) {
    const data = req.body;
    try {
      const carts = await Cart.create(data);
      res.status(200).json({ carts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getCartById(req, res) {
    const { accountid } = req.params;
    try {
      const carts = await Cart.findAll({
        where: {
          accountid,
        },
        include: {
          model: ProductColor,
          include: [
            {
              model: Product
            },
            {
              model: ProductImage
            }
          ]
        },
      });
      res.status(200).json({ carts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async updateQuantity(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await Cart.findByPk(id);
      if (cart) {
        await cart.update({ quantity });
        res.status(200).json({ cart });
      } else {
        res.status(400).json({ message: "Cart not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async deleteCart(req, res) {
    const { id } = req.params;
    try {
      const cart = await Cart.findByPk(id);
      if (cart) {
        await cart.destroy();
        res.status(200).json({ message: "Cart deleted successfully" });
      } else {
        res.status(404).json({ message: "Cart not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default cartController;
