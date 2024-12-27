// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//   }
// );

// export default sequelize;
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ishop", "root", "phi171102", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;