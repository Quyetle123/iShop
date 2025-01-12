import { VoucherAccount } from "../models/index.js";

class VoucherAccountController {
  static async addVoucherAccount(req, res) {
    const data = req.body;
    try {
      const voucherAccount = await VoucherAccount.create(data);
      res.status(200).json({ voucherAccount });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default VoucherAccountController
