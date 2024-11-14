import { ProductImage } from "../models/index.js";

class ProductImageController {
    static async addProductImage(req, res) {
        const data = req.body;
        try {
            const productImage = await ProductImage.create(data);
            res.status(200).json({productImage})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    static async getProductImageByColorId(req, res) {
        const {productColorid} = req.params;
        try {
            const images = await ProductImage.findAll({
                where: {productColorid},
            })
        } catch (error) {
            
        }
    }
}

export default ProductImageController;