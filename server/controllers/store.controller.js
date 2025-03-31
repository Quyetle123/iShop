import { Branch, District, Province, Store, Wards } from '../models/index.js';

class storeController {
    static async addStore(req, res) {
        const data = req.body;
        try {
            const store = await Store.create(data);
            res.status(200).json({ store });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getStorebyId(req, res) {
        const { id } = req.params;
        try {
            const store = await Store.findOne({
                where: { id },
                include: [
                    {
                        model: Branch,
                        include: [
                            {
                                model: Province,
                            },
                        ],
                    },
                    {
                        model: District,
                    },
                    {
                        model: Wards,
                    },
                ],
            });

            if (store) {
                res.status(200).json({ store });
            } else {
                res.status(404).json({ message: 'Store not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateStatusStore(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const store = await Store.findByPk(id);
            if (store) {
                await store.update({ status });
                res.status(200).json({ store });
            } else {
                res.status(400).json({ message: 'Store not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default storeController;
