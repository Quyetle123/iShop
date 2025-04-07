import { Category, Color, Product, ProductColor, ProductImage, Store, StoreStock } from '../models/index.js';

class StoreStockController {
    static async initializeStoreStock(req, res) {
        try {
            const { storeid } = req.body;

            const existingStock = await StoreStock.findOne({ where: { storeid } });
            if (existingStock) {
                return res.status(400).json({ message: 'Kho đã được khởi tạo trước đó!' });
            }

            const companyProducts = await ProductColor.findAll();

            if (companyProducts.length === 0) {
                return res.status(400).json({ message: 'Không có sản phẩm nào trong kho tổng công ty!' });
            }

            const storeStockEntries = companyProducts.map((productColor) => ({
                storeid,
                productColorid: productColor.id,
                quantity: 0,
                sold: 0,
            }));

            await StoreStock.bulkCreate(storeStockEntries);

            res.json({ success: true, message: 'Khởi tạo kho thành công!' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    static async syncNewProductsToStore(req, res) {
        try {
            const { storeid } = req.body;

            if (!storeid) {
                return res.status(400).json({ message: 'Thiếu storeid!' });
            }

            const allCompanyProducts = await ProductColor.findAll({
                include: [{ model: Product, where: { deletedAt: null } }],
            });
            if (allCompanyProducts.length === 0) {
                return res.status(400).json({ message: 'Không có sản phẩm nào trong kho công ty!' });
            }

            const existingStocks = await StoreStock.findAll({ where: { storeid } });
            const existingProductIds = existingStocks.map((stock) => stock.productColorid);

            const newProducts = allCompanyProducts.filter((product) => !existingProductIds.includes(product.id));

            const newEntries = newProducts.map((product) => ({
                storeid,
                productColorid: product.id,
                quantity: 0,
                sold: 0,
            }));

            if (newEntries.length > 0) {
                await StoreStock.bulkCreate(newEntries);
            }

            res.json({
                success: true,
                message: `Đã cập nhật kho cửa hàng ${storeid}. Số sản phẩm mới thêm: ${newEntries.length}`,
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    static async getAllStoreStock(req, res) {
        try {
            const storeStocks = await StoreStock.findAll({
                include: [
                    {
                        model: ProductColor,
                        include: [
                            {
                                model: Product,
                            },
                            {
                                model: ProductImage,
                            },
                            {
                                model: Color,
                            },
                        ],
                    },
                    {
                        model: Store,
                    },
                ],
            });
            res.status(200).json({ storeStocks });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getStoreStock(req, res) {
        try {
            const { storeid } = req.params;
            const storeStocks = await StoreStock.findAll({
                where: { storeid },
                include: [
                    {
                        model: ProductColor,
                        include: [
                            {
                                model: Product,
                            },
                            {
                                model: ProductImage,
                            },
                        ],
                    },
                ],
            });
            res.status(200).json({ storeStocks });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateQuantityStoreStock(req, res) {
        try {
            const { storeid } = req.params;
            const { productColorid, quantity } = req.body;

            const storeStock = await StoreStock.findOne({
                where: { storeid, productColorid },
            });

            if (!storeStock) {
                return res.status(404).json({ message: 'store stock not found' });
            }

            await storeStock.update({ quantity: storeStock.quantity + quantity });

            res.status(200).json({
                message: 'update quantity store stock successfully',
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async producStatistics(req, res) {
        try {
            const { storeid } = req.params;

            const categories = await Category.findAll({
                include: [
                    {
                        model: Product,
                        include: [{ model: ProductColor }],
                    },
                ],
            });

            if (!categories || categories.length === 0) {
                return res.status(200).json({ labels: [], datasets: [] });
            }

            let labels = [];
            let soldData = [];
            let stockData = [];

            for (const category of categories) {
                let quantitySold = 0;
                let quantity = 0;

                if (Array.isArray(category.Products)) {
                    for (const product of category.Products) {
                        if (Array.isArray(product.ProductColors)) {
                            for (const color of product.ProductColors) {
                                const storeStocks = await StoreStock.findAll({
                                    where: { productColorid: color.id, storeid }, // Lọc theo storeid
                                });

                                for (const stock of storeStocks) {
                                    quantitySold += parseFloat(stock.sold || 0);
                                    quantity += parseFloat(stock.quantity || 0);
                                }
                            }
                        }
                    }
                }

                labels.push(category.categoryname);
                soldData.push(quantitySold);
                stockData.push(quantity);
            }

            const productData = {
                labels,
                datasets: [
                    {
                        label: 'Đã bán',
                        data: soldData,
                        backgroundColor: '#1890ff',
                    },
                    {
                        label: 'Tồn kho',
                        data: stockData,
                        backgroundColor: '#ff4d4f',
                    },
                ],
            };

            return res.status(200).json(productData);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default StoreStockController;
