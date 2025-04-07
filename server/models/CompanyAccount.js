import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CompanyAccount = sequelize.define(
    'CompanyAccount',
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
        accountid: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
                model: 'accounts',
                key: 'id',
            },
        },
    },
    {
        tableName: 'company_accounts',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
);

export default CompanyAccount;
