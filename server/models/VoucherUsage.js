import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const VoucherUsage = sequelize.define(
  "VoucherUsage",
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
    },
    used_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
  },
  {
    tableName: "voucher_usages",
    timestamps: false,
  }
);

export default VoucherUsage;
