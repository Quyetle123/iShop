import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    storename: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    branchCity: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "stores",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Store;
