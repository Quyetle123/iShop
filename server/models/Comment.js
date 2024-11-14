import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    productid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
  },
  {
    tableName: "comments",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Comment;
