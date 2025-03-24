import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const InventoryHistory = sequelize.define(
  "InventoryHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productColorid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "product_colors",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    storeid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "stores",
        key: "id",
      },
    },
  },
  {
    tableName: "inventory_history",
    timestamps: true,
  }
);
export default InventoryHistory;
