import { where, Op } from "sequelize";
import {
  Order,
  OrderDetail,
  Product,
  ProductColor,
  ProductImage,
} from "../models/index.js";
function getColorForStatus(status) {
  const colors = {
    "Đang đóng gói": "#ff7f50",
    "Đang vận chuyển": "#6495ed",
    "Đã giao hàng": "#32cd32",
    "Đã hủy": "#ff0000",
  };
  return colors[status] || "#000";
}

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
          include: {
            model: ProductColor,
            include: [
              {
                model: Product,
                paranoid: false,
              },
              {
                model: ProductImage,
              },
            ],
          },
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
        include: {
          model: OrderDetail,
          include: {
            model: ProductColor,
            include: [
              {
                model: Product,
                paranoid: false,
              },
              {
                model: ProductImage,
              },
            ],
          },
        },
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

  static async getOrderStatistics(req, res) {
    try {
      const statuses = [
        "Đang đóng gói",
        "Đang vận chuyển",
        "Đã giao hàng",
        "Đã hủy",
      ];
      let result = [];

      for (const status of statuses) {
        const orders = await Order.findAll({
          where: { status },
          attributes: ["id", "total"],
        });

        const totalOrders = orders.length;
        const totalAmount = orders.reduce(
          (sum, order) => sum + parseFloat(order.total || 0),
          0
        );

        result.push({ status, totalOrders, totalAmount });
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getOrderStatisticMonth(req, res) {
    try {
      const { startMonth, startYear, endMonth, endYear } = req.query;
      if (!startMonth || !startYear || !endMonth || !endYear) {
        return res.status(400).json({
          message: "Vui lòng cung cấp startMonth, startYear, endMonth, endYear",
        });
      }

      const statuses = [
        "Đã giao hàng",
        "Đã hủy",
      ];
      const labels = [];
      let currentMonth = new Date(startYear, startMonth - 1, 1);
      const endDate = new Date(endYear, endMonth, 0);

      while (currentMonth <= endDate) {
        labels.push(
          `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`
        );
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      }

      let datasets = [];

      for (const status of statuses) {
        const monthlyData = new Array(labels.length).fill(0);

        const orders = await Order.findAll({
          where: {
            status,
            createdAt: {
              [Op.between]: [new Date(startYear, startMonth - 1, 1), endDate],
            },
          },
          attributes: ["id", "total", "createdAt"],
        });

        orders.forEach((order) => {
          const orderDate = new Date(order.createdAt);
          const label = `${orderDate.getFullYear()}-${(orderDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
          const index = labels.indexOf(label);
          if (index !== -1) {
            monthlyData[index] += parseFloat(order.total || 0);
          }
        });

        datasets.push({
          label: status,
          data: monthlyData,
          backgroundColor: getColorForStatus(status),
        });
      }

      return res.status(200).json({ labels, datasets });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default orderController;
