import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const VoucherAccount = sequelize.define(
  "VoucherAccount",
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    voucher_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'vourchers',
            key: 'id'
        }
    },
    account_id: {
       type: DataTypes.STRING(50),
       allowNull: false,
       references: {
            model: 'accounts',
            key: "id"
       } 
    }
  },
  {
    tableName: "voucher_accounts",
    timestamps: false,
  }
);

export default VoucherAccount;
