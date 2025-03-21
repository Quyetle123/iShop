import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRouter from "./routes/account.route.js";
import categoryRouter from "./routes/category.route.js";
import ProductRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import orderDetailRouter from "./routes/orderDetail.route.js";
import commentRouter from "./routes/comment.route.js";
import notifyRouter from "./routes/notify.route.js";
import storeRouter from "./routes/store.route.js";
import storeAccountRouter from "./routes/storeAccount.route.js";
import branchRouter from "./routes/branch.route.js";
import colorRouter from "./routes/color.route.js";
import productColorRouter from "./routes/productColor.route.js";
import productImageRouter from "./routes/productImage.route.js";
import wishListRouter from "./routes/wishlist.route.js";
import postRouter from "./routes/post.route.js";
import VourcherRouter from "./routes/vourcher.route.js";
import VoucherAccount from "./routes/voucherAccount.route.js";
import VoucherProduct from "./routes/voucherProduct.route.js";
import VoucherUsage from "./routes/voucherUsage.route.js";
import AddressRouter from "./routes/address.route.js";
import storeStockRouter from "./routes/storeStock.router.js";
import ProvinceRouter from "./routes/province.route.js";
import DistrictRouter from "./routes/district.route.js";
import WardRouter from "./routes/ward.route.js";
import administratorStatiscalRouter from "./routes/administrator.statistical.route.js";
import InventoryHistoryRouter from "./routes/inventoryHistory.route.js";
import LocationStoreRouter from "./routes/locationStore.route.js";
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

dotenv.config();

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
app.use("/api/color", colorRouter);
app.use("/api/productColor", productColorRouter);
app.use("/api/productImage", productImageRouter);
app.use("/api/post", postRouter);
app.use("/api/wishList", wishListRouter);
app.use("/api/vourcher", VourcherRouter);
app.use("/api/voucherAccount", VoucherAccount);
app.use("/api/voucherProduct", VoucherProduct);
app.use("/api/voucherUsage", VoucherUsage);
app.use("/api/address", AddressRouter);
app.use("/api/storeStock", storeStockRouter);
app.use("/api/province", ProvinceRouter);
app.use("/api/district", DistrictRouter);
app.use("/api/ward", WardRouter);
app.use("/api/administratorStatistical", administratorStatiscalRouter);
app.use("/api/inventoryHistory", InventoryHistoryRouter);
app.use("/api/locationStore", LocationStoreRouter);

setupSocket(io);

const PORT = process.env.PORT;

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
