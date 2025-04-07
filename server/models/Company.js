import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Company = sequelize.define(
    'Company',
    {
        id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
        },
        companyname: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        city: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'province',
                key: 'province_id',
            },
        },
        district: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'district',
                key: 'district_id',
            },
        },
        ward: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'wards',
                key: 'wards_id',
            },
        },
    },
    {
        tableName: 'companies',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
);

export default Company;
