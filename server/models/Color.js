import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Color = sequelize.define(
  "Color",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    hex_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "colors",
    timestamps: false,
  }
);

export default Color;
