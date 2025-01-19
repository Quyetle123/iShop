import { VoucherProduct } from "../models/index.js";

class VoucherProductController {
  static async addVoucherProduct(req, res) {
    const data = req.body;
    try {
      const voucherProduct = await VoucherProduct.create(data);
      res.status(200).json({ voucherProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async allVoucherProducts(req, res) {
    try {
      const voucherProducts = await VoucherProduct.findAll();
      res.status(200).json({ voucherProducts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async voucherProductById(req, res) {
    const id = req.params;
    try {
      const voucherProduct = await VoucherProduct.findByPk(id);
      if (voucherProduct) {
        res.status(200).json({ voucherProduct });
      } else {
        res.status(404).json({ message: error.message });
      }
    } catch (error) {
      res.status(400).message({ message: error, message });
    }
  }
}

export default VoucherProductController;
