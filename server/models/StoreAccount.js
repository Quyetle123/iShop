import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const StoreAccount = sequelize.define("StoreAccount", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  storeid: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: 'stores',
      key: 'id'
    }
  },
  accountid: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    }
  }
}, {
  tableName: "store_accounts",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

export default StoreAccount;
