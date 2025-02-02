import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Wishlist = sequelize.define(
  "Wishlist",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productColorid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "product_colors",
        key: "id",
      },
    },
    accountid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "accounts",
        key: "id",
      },
    },
  },
  {
    tableName: "wishlist",
    timestamps: true,
    paranoid: true, // Kích hoạt soft delete
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt", // Cột deletedAt dùng để lưu xóa mềm
  }
);

Wishlist.sync({ alter: true })
  .then(() => {
    console.log("Bảng Wishlist đã được đồng bộ");
  })
  .catch((error) => {
    console.log("Lỗi khi đồng bộ bảng Wishlist:", error);
  });

export default Wishlist;
