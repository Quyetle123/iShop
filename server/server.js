import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.js";
import authRouter from "./routes/account.route.js";
import categoryRouter from "./routes/category.route.js";
import ProductRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js"
import orderRouter from "./routes/order.route.js"
import orderDetailRouter from "./routes/orderDetail.route.js";
import commentRouter from "./routes/comment.route.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/orderDetail", orderDetailRouter)
app.use("/api/comment", commentRouter)

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
