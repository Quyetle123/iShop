import { StoreAccount } from "../models/index.js";

class storeAccountController {
  static async addAccountStore(req, res) {
    const data = req.body;
    try {
      const accountStore = await StoreAccount.create(data);
      res.status(200).json({ accountStore });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default storeAccountController;
