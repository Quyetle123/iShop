import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Notify = sequelize.define(
  "Notify",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    timestamps: true,
    tableName: 'notify'
  }
);

export default Notify;
