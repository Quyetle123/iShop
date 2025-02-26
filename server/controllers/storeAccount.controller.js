import { Store, StoreAccount } from "../models/index.js";

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

  static async getAccountStorebyAccountId(req, res) {
    try {
      const { accountid } = req.params;
  
      const accountStore = await StoreAccount.findOne({
        where: { accountid },
        include: {
          model: Store,
        },
      });
  
      if (!accountStore) {
        return res.status(404).json({ message: "Không tìm thấy cửa hàng nào cho tài khoản này!" });
      }
  
      res.status(200).json({ accountStore });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
  }
  
  
}

export default storeAccountController;
