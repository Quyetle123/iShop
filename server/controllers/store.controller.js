import { Account, Branch, District, Province, Store, StoreAccount, Wards } from '../models/index.js';
import bcrypt from 'bcryptjs';

class storeController {
    static async addStore(req, res) {
        const {storeid , storename, branchid, district, ward, address, adminid, username, phoneNumber, email, password} = req.body;
        try {
            const store = await Store.create({id: storeid, storename, branchid, district, ward, address, status: 'Cần khởi tạo'});
            const hashedPassword = await bcrypt.hash(password, 10);
            const account = await Account.create({
                id: adminid,
                password: hashedPassword,
                username,
                phoneNumber,
                email,
                role: 'admin',
            }); 
            const accountStore = await StoreAccount.create({storeid, accountid: adminid});
            res.status(200).json({ store, account, accountStore });
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

    static async getStoreByBranchId(req, res) {
        const { branch_id } = req.params;
        try {
            const store = await Store.findAll({
                where: { branchid: branch_id },
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
