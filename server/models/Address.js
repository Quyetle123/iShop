import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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
      city: {
        type: DataTypes.STRING(255), 
        allowNull: true, 
      },
      district: {
        type: DataTypes.STRING(255), 
        allowNull: true, 
      },
      ward: {
        type: DataTypes.STRING(255), 
        allowNull: true, 
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
    tableName: "posts",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default Post;
