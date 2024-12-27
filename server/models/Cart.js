import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Cart = sequelize.define(
  "Cart",
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
    productColorid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "product_colors",
        key: "id",
      },
    },
    accountid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "accounts",
        key: "id",
      },
    },
  },
  {
    tableName: "carts",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

Cart.sync({ alter: true })
  .then(() => {
    console.log("Đã được đồng bộ");
  })
  .catch((error) => {
    console.log("Lỗi khi đồng bộ bảng Cart:", error);
  });

export default Cart;
