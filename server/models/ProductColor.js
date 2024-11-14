import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductColor = sequelize.define(
  "ProductColor",
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "products",
        key: "id"
      }
    },
    colorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "colors",
        key: "id",
      },
    },
  },
  {
    tableName: "product_colors",
    timestamps: true,
  }
);

export default ProductColor;
