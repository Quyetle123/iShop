import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define(
    'Order',
    {
        id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'province',
                key: 'province_id',
            },
        },
        district: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'district',
                key: 'district_id',
            },
        },
        ward: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'wards',
                key: 'wards_id',
            },
        },
        payMethod: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        accountid: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
                model: 'accounts',
                key: 'id',
            },
        },
        storeid: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
                model: 'stores',
                key: 'id',
            },
        },
    },
    {
        tableName: 'orders',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
);

export default Order;
