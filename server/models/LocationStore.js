import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const LocationStore = sequelize.define(
  "LocationStore",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    storeid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "stores",
        key: "id",
      },
    },
    lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "location_stores",
    timestamps: false,
  }
);

export default LocationStore;
