import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Province = sequelize.define('Province', {
    province_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
}, {
    tableName: 'province',
    timestamps: false
});

export default Province;