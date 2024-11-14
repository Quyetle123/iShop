import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductImage = sequelize.define("ProductImage", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    productColorid: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: "product_colors",
            key: "id"
        }
    }
}, {
    tableName: "product_images",
    timestamps: true
})

export default ProductImage