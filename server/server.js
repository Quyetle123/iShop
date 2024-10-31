import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import sequelize from "./config/db.js";
import authRouter from "./routes/account.route.js";
import categoryRouter from "./routes/category.route.js";
import ProductRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import orderDetailRouter from "./routes/orderDetail.route.js";
import commentRouter from "./routes/comment.route.js";
import notifyRouter from "./routes/notify.route.js";
import storeRouter from "./routes/store.route.js"
import storeAccountRouter from "./routes/storeAccount.route.js"
import branchRouter from "./routes/branch.route.js";
import setupSocket from "./socket/socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/orderDetail", orderDetailRouter);
app.use("/api/comment", commentRouter);
app.use("/api/notify", notifyRouter);
app.use("/api/store", storeRouter);
app.use("/api/storeAccount", storeAccountRouter);
app.use("/api/branch", branchRouter);

setupSocket(io);

const PORT = 5000;

sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
