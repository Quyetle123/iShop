import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Account } from "../models/index.js";
import _ from "lodash";

class AuthController {
  static generateToken(account) {
    return jwt.sign(
      {
        id: account.id,
        username: account.username,
        email: account.email,
        role: account.role,
        city: account.city,
        address: account.address,
      },
      "quyetledeptrai",
      { expiresIn: "1h" }
    );
  }

  static async register(req, res) {
    const { password, ...rest } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const account = await Account.create({
        password: hashedPassword,
        ...rest,
      });
      const token = AuthController.generateToken(account);
      res.status(201).json({
        token,
        account: {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role,
          city: account.city,
          address: account.address,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { phoneNumber, password } = req.body;
    try {
      const account = await Account.findOne({ where: { phoneNumber } });
      if (!account || !(await bcrypt.compare(password, account.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = AuthController.generateToken(account);
      res.status(201).json({
        token,
        account: {
          id: account.id,
          phoneNumber: account.phoneNumber,
          username: account.username,
          email: account.email,
          role: account.role,
          city: account.city,
          address: account.address,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async loginWithGoogle(req, res) {
    const { email } = req.body;
    try {
      const account = await Account.findOne({ where: { email } });
      const token = AuthController.generateToken(account);
      res.status(201).json({
        token,
        account: {
          id: account.id,
          phoneNumber: account.phoneNumber,
          username: account.username,
          email: account.email,
          role: account.role,
          city: account.city,
          address: account.address,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAccounts(req, res) {
    try {
      const accounts = await Account.findAll();
      res.status(200).json({accounts});
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }
}

export default AuthController;
