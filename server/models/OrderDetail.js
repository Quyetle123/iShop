import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Order from "./Order.js";

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productColorid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "product_colors",
        key: "id",
      },
    },
    orderid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
  },
  {
    tableName: "orderDetails",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default OrderDetail;
