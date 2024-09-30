import { where } from "sequelize";
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const products = await Product.create(data);
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProductByCategoryId = async (req, res) => {
  const { categoryid } = req.params;
  try {
    const products = await Product.findAll({
      where: { categoryid },
      limit: 4,
      order: [['quantity', 'DESC']]
    });
    res.status(200).json({products})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.update(data);
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
