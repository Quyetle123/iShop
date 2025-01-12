import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const VoucherProduct = sequelize.define(
  "VoucherProduct",
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
    product_id: {
       type: DataTypes.STRING(50),
       allowNull: false,
       references: {
            model: 'products',
            key: "id"
       } 
    }
  },
  {
    tableName: "voucher_products",
    timestamps: false,
  }
);

export default VoucherProduct;
