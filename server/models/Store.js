import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Store = sequelize.define(
    'Store',
    {
        id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
        },
        storename: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        branchid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'branches',
                key: 'id',
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
        tableName: 'stores',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
);

export default Store;
