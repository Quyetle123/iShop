import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Vourcher = sequelize.define(
  "Vourcher",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    discount_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discount_percent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_discount_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    minimum_order_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valid_to: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "vourchers",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Vourcher;
