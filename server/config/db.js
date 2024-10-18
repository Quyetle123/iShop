import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ishop", "root", "nhuy123456", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
