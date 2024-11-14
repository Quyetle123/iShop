import { ProductColor } from "../models/index.js";

class productColorController {
    static async addProductCollor(req, res) {
        const data = req.body;
        try {
            const productColor = await ProductColor.create(data);
            res.status(200).json({productColor})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}

export default productColorController;