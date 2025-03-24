import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Otp = sequelize.define(
    'Otp',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        otp: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: 'otps',
        timestamps: true,
    },
);

export default Otp;
