import Account from "./Account.js";
import Cart from "./Cart.js";
import Category from "./Category.js";
import Comment from "./Comment.js";
import Order from "./Order.js";
import OrderDetail from "./OrderDetail.js";
import Product from "./Product.js";
import Store from "./Store.js";
import StoreAccount from "./StoreAccount.js";
import Branch from "./Branch.js";
import Color from "./Color.js";
import ProductColor from "./ProductColor.js";
import ProductImage from "./ProductImage.js";
import Post from "./Post.js";
import Vourcher from "./Vourcher.js";
import VoucherAccount from "./VoucherAccount.js";
import VoucherProduct from "./VoucherProduct.js";
import VoucherUsage from "./VoucherUsage.js";

Account.hasMany(Cart, { foreignKey: "accountid" });
Cart.belongsTo(Account, { foreignKey: "accountid" });

Category.hasMany(Product, { foreignKey: "categoryid" });
Product.belongsTo(Category, { foreignKey: "categoryid" });

ProductColor.hasMany(Cart, { foreignKey: "productColorid" });
Cart.belongsTo(ProductColor, { foreignKey: "productColorid" });

Account.hasMany(Order, { foreignKey: "accountid" });
Order.belongsTo(Account, { foreignKey: "accountid" });

Order.hasMany(OrderDetail, { foreignKey: "orderid" });
OrderDetail.belongsTo(Order, { foreignKey: "orderid" });

ProductColor.hasMany(OrderDetail, { foreignKey: "productColorid" });
OrderDetail.belongsTo(ProductColor, { foreignKey: "productColorid" });

Product.hasMany(Comment, { foreignKey: "productid" });
Comment.belongsTo(Product, { foreignKey: "productid" });

Account.hasMany(Comment, { foreignKey: "accountid" });
Comment.belongsTo(Account, { foreignKey: "accountid" });

Store.hasMany(StoreAccount, { foreignKey: "storeid" });
StoreAccount.belongsTo(Store, { foreignKey: "storeid" });

Account.hasMany(StoreAccount, { foreignKey: "accountid" });
StoreAccount.belongsTo(Account, { foreignKey: "accountid" });

Account.hasMany(VoucherAccount, { foreignKey: "account_id" });
VoucherAccount.belongsTo(Account, { foreignKey: "account_id" });

Account.hasMany(VoucherUsage, { foreignKey: "accountid" });
VoucherUsage.belongsTo(Account, { foreignKey: "accountid" });

Branch.hasMany(Store, { foreignKey: "branchid" });
Store.belongsTo(Branch, { foreignKey: "branchid" });

Color.hasMany(ProductColor, { foreignKey: "colorid" });
ProductColor.belongsTo(Color, { foreignKey: "colorid" });

Product.hasMany(ProductColor, { foreignKey: "productid" });
ProductColor.belongsTo(Product, { foreignKey: "productid" });

Product.hasMany(VoucherProduct, { foreignKey: "product_id" });
VoucherProduct.belongsTo(Product, { foreignKey: "product_id" });

ProductColor.hasMany(ProductImage, { foreignKey: "productColorid" });
ProductImage.belongsTo(ProductColor, { foreignKey: "productColorid" });

Vourcher.hasMany(VoucherAccount, { foreignKey: "voucher_id" });
VoucherAccount.belongsTo(Vourcher, { foreignKey: "voucher_id" });

Vourcher.hasMany(VoucherProduct, { foreignKey: "voucher_id" });
VoucherProduct.belongsTo(Vourcher, { foreignKey: "voucher_id" });

Vourcher.hasMany(VoucherUsage, { foreignKey: "voucher_id" });
VoucherUsage.belongsTo(Vourcher, { foreignKey: "voucher_id" });

export {
  Account,
  Cart,
  Category,
  Product,
  Order,
  OrderDetail,
  Comment,
  Store,
  StoreAccount,
  Branch,
  Color,
  ProductColor,
  ProductImage,
  Post,
  Vourcher,
  VoucherAccount,
  VoucherProduct,
  VoucherUsage,
};
