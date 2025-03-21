import {
  Product,
  ProductColor,
  ProductImage,
  StoreStock,
} from "../models/index.js";

class StoreStockController {
  static async initializeStoreStock(req, res) {
    try {
      const { storeid } = req.body;

      const existingStock = await StoreStock.findOne({ where: { storeid } });
      if (existingStock) {
        return res
          .status(400)
          .json({ message: "Kho đã được khởi tạo trước đó!" });
      }

      const companyProducts = await ProductColor.findAll();

      if (companyProducts.length === 0) {
        return res
          .status(400)
          .json({ message: "Không có sản phẩm nào trong kho tổng công ty!" });
      }

      const storeStockEntries = companyProducts.map((productColor) => ({
        storeid,
        productColorid: productColor.id,
        quantity: 0,
        sold: 0,
      }));

      await StoreStock.bulkCreate(storeStockEntries);

      res.json({ success: true, message: "Khởi tạo kho thành công!" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }

  static async getStoreStock(req, res) {
    try {
      const { storeid } = req.params;
      const storeStocks = await StoreStock.findAll({
        where: { storeid },
        include: [
          {
            model: ProductColor,
            include: [
              {
                model: Product,
              },
              {
                model: ProductImage,
              },
            ],
          },
        ],
      });
      res.status(200).json({ storeStocks });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateQuantityStoreStock(req, res) {
    try {
      const { storeid } = req.params;
      const { productColorid, quantity } = req.body;

      const storeStock = await StoreStock.findOne({
        where: { storeid, productColorid },
      });

      if (!storeStock) {
        return res.status(404).json({ message: "store stock not found" });
      }

      await storeStock.update({ quantity: storeStock.quantity + quantity });

      res.status(200).json({
        message: "update quantity store stock successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default StoreStockController;
