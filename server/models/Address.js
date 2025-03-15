import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Province from "./Province.js";
import District from "./District.js";
import Wards from "./Ward.js";
import Account from "./Account.js";

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Province,
        key: "province_id",
      },
    },
    district_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: District,
        key: "district_id",
      },
    },
    wards_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Wards,
        key: "wards_id",
      },
    },
    accountid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: Account,
        key: "id",
      },
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "addresses",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Address;
