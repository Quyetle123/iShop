import Account from "./Account.js";
import Cart from "./Cart.js";
import Category from "./Category.js";
import Comment from "./Comment.js";
import Order from "./Order.js";
import OrderDetail from "./OrderDetail.js";
import Product from "./Product.js";

Account.hasMany(Cart, { foreignKey: "accountid" });
Cart.belongsTo(Account, { foreignKey: "accountid" });

Category.hasMany(Product, { foreignKey: "categoryid" });
Product.belongsTo(Category, { foreignKey: "categoryid" });

Product.hasMany(Cart, { foreignKey: "productid" });
Cart.belongsTo(Product, { foreignKey: "productid" });

Account.hasMany(Order, { foreignKey: "accountid" });
Order.belongsTo(Account, { foreignKey: "accountid" });

Order.hasMany(OrderDetail, { foreignKey: "orderid" });
OrderDetail.belongsTo(Order, { foreignKey: "orderid" });

Product.hasMany(OrderDetail, { foreignKey: "productid" });
OrderDetail.belongsTo(Product, { foreignKey: "productid" });

Product.hasMany(Comment, { foreignKey: "productid" });
Comment.belongsTo(Product, { foreignKey: "productid" });

Account.hasMany(Comment, { foreignKey: "accountid" });
Comment.belongsTo(Account, { foreignKey: "accountid" });

export { Account, Cart, Category, Product, Order, OrderDetail, Comment };
