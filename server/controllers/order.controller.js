import { Order, OrderDetail } from "../models/index.js";
class orderController {
  static async addOrder(req, res) {
    const data = req.body;
    try {
      const orders = await Order.create(data);
      res.status(200).json({ orders });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getOrderByAccountId(req, res) {
    const { accountid } = req.params;
    try {
      const orders = await Order.findAll({
        where: {
          accountid,
        },
        include: {
          model: OrderDetail,
        },
      });
      res.status(200).json({ orders });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllOrder(req, res) {
    try {
      const orders = await Order.findAll({
        include: OrderDetail,
      });
      res.status(200).json({ orders });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateStatusOrder(req, res) {
    const { id } = req.params;
    const { status, accountid } = req.body;
    try {
      const order = await Order.findByPk(id);
      if (order) {
        await order.update({ status });

        res.status(200).json({ order });
      } else {
        res.status(400).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default orderController;
