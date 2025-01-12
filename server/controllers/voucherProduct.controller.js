import {VoucherProduct} from "../models/index.js"

class VoucherProductController {
    static async addVoucherProduct(req, res) {
        const data = req.body;
        try {
            const voucherProduct = await VoucherProduct.create(data);
            res.status(200).json({voucherProduct});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}

export default VoucherProductController