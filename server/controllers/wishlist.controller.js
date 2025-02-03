import { Account, Product, ProductColor, ProductImage, Color, Wishlist } from "../models/index.js";
 class wishlistController {
    static async addWishlist(req, res) {
        const data = req.body;
        try {
            const wishlists = await Wishlist.create(data);
            res.status(200).json({ wishlists});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getWishlistById(req, res) {
        const { accountid } = req.params;
        try {
            const wishlists = await Wishlist.findAll({
                where: {
                    accountid,
                },
                include: {
                    model: ProductColor,
                    include: [
                        {
                            model: Product
                        },
                        {
                            model: ProductImage
                        }
                    ]
                },
            });
            res.status(200).json({ wishlists });
        } catch (error) {
            res.status(400).json({ message: error.message});
        }
    }
    static async deleteWishlist(req, res) {
        const { id } = req.params;
        try {
            const wishlist = await Wishlist.findByPk(id);
            if (wishlist) {
                await wishlist.destroy();
                res.stastus(200).json({ message: "Wishlist deleted successfully"});
            } else {
                res.status(404).json({ message: "Wishlist not found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
 }

 export default wishlistController;