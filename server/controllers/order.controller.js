import { where, Op } from 'sequelize';
import { Branch, Order, OrderDetail, Product, ProductColor, ProductImage, Store } from '../models/index.js';
function getColorForStatus(status) {
    const colors = {
        'Đang đóng gói': '#ff7f50',
        'Đang vận chuyển': '#6495ed',
        'Đã giao hàng': '#32cd32',
        'Đã hủy': '#ff0000',
    };
    return colors[status] || '#000';
}

class orderController {
    static async addOrder(req, res) {
        const data = req.body;
        try {
            const orders = await Order.create(data);
            res.status(200).json({ orders });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getOrderByAccountId(req, res) {
        const { accountid } = req.params;
        try {
            const orders = await Order.findAll({
                where: {
                    accountid,
                },
                include: {
                    model: OrderDetail,
                    include: {
                        model: ProductColor,
                        include: [
                            {
                                model: Product,
                                paranoid: false,
                            },
                            {
                                model: ProductImage,
                            },
                        ],
                    },
                },
            });
            res.status(200).json({ orders });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllOrder(req, res) {
        try {
            const orders = await Order.findAll({
                limit: 5,
                include: {
                    model: OrderDetail,
                    include: {
                        model: ProductColor,
                        include: [
                            {
                                model: Product,
                                paranoid: false,
                            },
                            {
                                model: ProductImage,
                            },
                        ],
                    },
                },
            });
            res.status(200).json({ orders });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getOrderById(req, res) {
        const { id } = req.params;
        try {
            const order = await Order.findOne({
                where: {
                    id,
                },
                include: {
                    model: OrderDetail,
                    include: {
                        model: ProductColor,
                        include: [
                            {
                                model: Product,
                                paranoid: false,
                            },
                            {
                                model: ProductImage,
                            },
                        ],
                    },
                },
            });
            if (order) {
                res.status(200).json({ order });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getOrdersByStatus(req, res) {
        try {
            const { storeid } = req.params;
            const { page = 1, pageSize = 10, status } = req.query;
            const limit = parseInt(pageSize);
            const offset = (parseInt(page) - 1) * limit;

            const validStatuses = ['Chờ phê duyệt', 'Đang đóng gói', 'Đang vận chuyển', 'Đã giao hàng', 'Đã hủy'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
            }

            const { count, rows: orders } = await Order.findAndCountAll({
                where: { status, storeid },
                limit,
                offset,
            });

            res.status(200).json({
                orders,
                totalOrders: count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page),
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getOrderDraft(req, res) {
        try {
            const { accountid } = req.params;

            if (!accountid) {
                return res.status(400).json({ message: 'Account ID is required' });
            }

            const orderDraft = await Order.findOne({
                where: {
                    accountid,
                    status: 'Đơn nháp',
                },
                include: {
                    model: OrderDetail,
                    include: {
                        model: ProductColor,
                        include: [
                            {
                                model: Product,
                                paranoid: false,
                            },
                            {
                                model: ProductImage,
                            },
                        ],
                    },
                },
            });

            if (orderDraft) {
                res.status(200).json({ orderDraft });
            } else {
                res.status(404).json({ message: 'No order draft' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async newOrder(req, res) {
        const { id } = req.params;
        const { address, ward, district, city, payMethod, usename, phoneNumber, status } = req.body;

        try {
            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(400).json({ message: 'Order not found' });
            }

            const branches = await Branch.findAll();
            let selectedBranch;
            let selectedStore;

            const cityBranch = branches.find((branch) => branch.province_id === city);
            if (cityBranch) {
                const stores = await Store.findAll({
                    where: { branchid: cityBranch.id },
                });

                selectedStore = stores.find((store) => store.district === district);

                if (!selectedStore && stores.length > 0) {
                    selectedStore = stores.reduce((prev, curr) => {
                        return Math.abs(curr.district - district) < Math.abs(prev.district - district) ? curr : prev;
                    });
                }

                selectedBranch = cityBranch;
            } else {
                selectedBranch = branches.reduce((prev, curr) => {
                    return Math.abs(curr.province_id - city) < Math.abs(prev.province_id - city) ? curr : prev;
                });

                const storesInBranch = await Store.findAll({
                    where: { branchid: selectedBranch.id },
                });

                if (storesInBranch.length > 0) {
                    selectedStore = storesInBranch[Math.floor(Math.random() * storesInBranch.length)];
                }
            }

            if (!selectedBranch || !selectedStore) {
                return res.status(400).json({ message: 'No suitable store found' });
            }

            await order.update({
                address,
                ward,
                district,
                city,
                payMethod,
                usename,
                phoneNumber,
                status,
                storeid: selectedStore.id,
                createdAt: new Date(),
            });

            res.status(200).json({ order, store: selectedStore });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateStatusOrder(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const order = await Order.findByPk(id);
            if (order) {
                await order.update({ status });

                res.status(200).json({ order });
            } else {
                res.status(400).json({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getOrderStatistics(req, res) {
        const { storeid } = req.params;
        try {
            const statuses = ['Đang đóng gói', 'Đang vận chuyển', 'Đã giao hàng', 'Đã hủy'];
            let result = [];

            for (const status of statuses) {
                const orders = await Order.findAll({
                    where: { status, storeid },
                    attributes: ['id', 'total'],
                });

                const totalOrders = orders.length;
                const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0);

                result.push({ status, totalOrders, totalAmount });
            }

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getOrderStatisticMonth(req, res) {
        const { storeid } = req.params;
        try {
            const { startMonth, startYear, endMonth, endYear } = req.query;
            if (!startMonth || !startYear || !endMonth || !endYear) {
                return res.status(400).json({
                    message: 'Vui lòng cung cấp startMonth, startYear, endMonth, endYear',
                });
            }

            const statuses = ['Đã giao hàng', 'Đã hủy'];
            const labels = [];
            let currentMonth = new Date(startYear, startMonth - 1, 1);
            const endDate = new Date(endYear, endMonth, 0);

            while (currentMonth <= endDate) {
                labels.push(
                    `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}`,
                );
                currentMonth.setMonth(currentMonth.getMonth() + 1);
            }

            let datasets = [];

            for (const status of statuses) {
                const monthlyData = new Array(labels.length).fill(0);

                const orders = await Order.findAll({
                    where: {
                        status,
                        storeid,
                        createdAt: {
                            [Op.between]: [new Date(startYear, startMonth - 1, 1), endDate],
                        },
                    },
                    attributes: ['id', 'createdAt'],
                });

                orders.forEach((order) => {
                    const orderDate = new Date(order.createdAt);
                    const label = `${orderDate.getFullYear()}-${(orderDate.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}`;
                    const index = labels.indexOf(label);
                    if (index !== -1) {
                        monthlyData[index]++;
                    }
                });

                datasets.push({
                    label: status,
                    data: monthlyData,
                    backgroundColor: getColorForStatus(status),
                });
            }

            return res.status(200).json({ labels, datasets });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default orderController;
