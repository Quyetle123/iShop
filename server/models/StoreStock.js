import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const StoreStock = sequelize.define(
  "StoreStock",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    storeid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "stores",
        key: "id",
      },
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
      defaultValue: 0,
    },
    sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "store_stocks",
    timestamps: false,
  }
);

export default StoreStock;
