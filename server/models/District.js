import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { Province } from "./index.js";

const District = sequelize.define(
  "District",
  {
    district_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Province,
        key: "province_id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "district",
    timestamps: false,
  }
);

export default District;
