import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserSocket = sequelize.define("UserSocket", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    socketId: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    accountId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: "accounts",
            key: "id"
        }
    }
}, {
    tableName: "user_socket",
    timestamps: true
})

export default UserSocket;