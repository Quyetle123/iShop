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

  static async allVoucherAccount(req, res) {
    try {
      const voucherAccount = await VoucherAccount.findAll();
      res.status(200).json({ voucherAccount });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async voucherAccountById(req, res) {
    const { id } = req.params;
    try {
      const voucherAccount = await VoucherAccount.findByPk(id);
      if(voucherAccount) {
        res.status(200).json({voucherAccount})
      } else {
        res.status(404).json({message: "voucher account not found"});
      }
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }
}

export default VoucherAccountController;
