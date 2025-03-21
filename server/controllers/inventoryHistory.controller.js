import { Op } from "sequelize";
import {
  InventoryHistory,
  Product,
  ProductColor,
  ProductImage,
} from "../models/index.js";

class InventoryHistoryController {
  static async addInventoryHistory(req, res) {
    const data = req.body;
    try {
      const inventoryHistory = await InventoryHistory.create(data);
      res.status(200).json({ inventoryHistory });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getInventoryHistoryByStoreId(req, res) {
    try {
      const { storeid } = req.params;
      const { date } = req.query;

      if (!date) {
        return res.status(400).json({ error: "Vui lòng cung cấp ngày" });
      }

      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      const inventoryHistories = await InventoryHistory.findAll({
        where: {
          storeid,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            model: ProductColor,
            attributes: ["id"],
            include: [
              {
                model: Product,
                attributes: ["productname"],
              },
              { model: ProductImage, limit: 1 },
            ],
          },
        ],
      });

      res.status(200).json({ inventoryHistories });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default InventoryHistoryController;
