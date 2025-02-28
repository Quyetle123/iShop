import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { District } from "./index.js";

const Wards = sequelize.define('Wards', {
    wards_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    district_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: District,
            key: 'district_id'
        }
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
}, {
    tableName: 'wards',
    timestamps: false
});

export default Wards;