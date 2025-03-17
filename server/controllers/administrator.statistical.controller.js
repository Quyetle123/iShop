import { Op } from "sequelize";
import { Account, Branch, Order, Store } from "../models/index.js";

function getColorForStatus(status) {
  const colors = {
    "Đang đóng gói": "#ff7f50",
    "Đang vận chuyển": "#6495ed",
    "Đã giao hàng": "#32cd32",
    "Đã hủy": "#ff0000",
  };
  return colors[status] || "#000";
}

class AdministratorStatisticalController {
  static async generalStatistics(req, res) {
    try {
      const { startMonth, startYear, endMonth, endYear, type } = req.query;

      let orderFilter = {};
      const currentDate = new Date();

      if (type === "today") {
        orderFilter.createdAt = {
          [Op.gte]: new Date(currentDate.setHours(0, 0, 0, 0)),
          [Op.lt]: new Date(currentDate.setHours(23, 59, 59, 999)),
        };
      } else if (type === "thisWeek") {
        const startOfWeek = new Date();
        const day = currentDate.getDay();
        const diff = day === 0 ? -6 : 1 - day;

        startOfWeek.setDate(currentDate.getDate() + diff);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        orderFilter.createdAt = {
          [Op.gte]: startOfWeek,
          [Op.lt]: endOfWeek,
        };
      } else if (type === "thisMonth") {
        orderFilter.createdAt = {
          [Op.gte]: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          ),
          [Op.lt]: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
          ),
        };
      } else if (
        type === "custom" &&
        startMonth &&
        startYear &&
        endMonth &&
        endYear
      ) {
        orderFilter.createdAt = {
          [Op.gte]: new Date(startYear, startMonth - 1, 1),
          [Op.lt]: new Date(endYear, endMonth, 1),
        };
      }

      const totalOrders = await Order.count({ where: orderFilter });
      const totalRevenue =
        (await Order.sum("total", { where: orderFilter })) || 0;
      const totalStores = await Store.count();
      const totalBranches = await Branch.count();
      const totalUsers = await Account.count();

      res.json({
        totalOrders,
        totalRevenue,
        totalStores,
        totalBranches,
        totalUsers,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
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
        "Đang vận chuyển",
        "Đang đóng gói",
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
          attributes: ["id", "createdAt"],
        });

        orders.forEach((order) => {
          const orderDate = new Date(order.createdAt);
          const label = `${orderDate.getFullYear()}-${(orderDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
          const index = labels.indexOf(label);
          if (index !== -1) {
            monthlyData[index]++;
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

export default AdministratorStatisticalController;
