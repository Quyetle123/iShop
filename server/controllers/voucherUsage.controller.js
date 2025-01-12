import { VoucherUsage } from "../models/index.js";

class VoucherUsageController {
  static async addVoucherUsage(req, res) {
    const data = req.body;
    try {
      const voucherUsage = await VoucherUsage.create(data);
      res.status(200).json({ voucherUsage });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default VoucherUsageController;
