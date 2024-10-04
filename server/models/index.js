import Account from "./Account.js";
import Cart from "./Cart.js";
import Category from "./Category.js";
import Product from "./Product.js";

Account.hasMany(Cart, { foreignKey: "accountid" });
Cart.belongsTo(Account, { foreignKey: "accountid" });

Category.hasMany(Product, { foreignKey: "categoryid" });
Product.belongsTo(Category, { foreignKey: "categoryid" });

Product.hasMany(Cart, {foreignKey: "productid"});
Cart.belongsTo(Product, {foreignKey: "productid"});

export { Account, Cart, Category, Product };
