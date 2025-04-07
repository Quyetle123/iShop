import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CompanyStock = sequelize.define(
    'CompanyStock',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        companyid: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
                model: 'companies',
                key: 'id',
            },
        },
        productColorid: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
                model: 'product_colors',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        sold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: 'company_stocks',
        timestamps: false,
    },
);

export default CompanyStock;
