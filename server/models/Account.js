import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING(255), 
    allowNull: true, 
  },
  address: {
    type: DataTypes.STRING(255), 
    allowNull: true, 
  },
  city: {
    type: DataTypes.STRING(255), 
    allowNull: true, 
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
    tableName: "accounts",
    timestamps: true
});

export default Account
