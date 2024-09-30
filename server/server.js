import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.js";
import authRouter from "./routes/accountRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import ProductRouter from "./routes/productRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", ProductRouter);

const PORT = 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
