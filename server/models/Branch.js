import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Province from "./Province.js";
const Branch = sequelize.define(
  "Branch",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Province,
        key: "province_id",
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "branches",
    timestamps: true,
  }
);

export default Branch;
