import { Account, Company, CompanyAccount, District, Province, Wards } from '../models/index.js';

class CompanyAccountController {
    static async getAccountCompanyByAccountId(req, res) {
        const { accountid } = req.params;
        try {
            const companyAccount = await CompanyAccount.findOne({
                where: { accountid },
                include: [
                    { model: Company, include: [{ model: Province }, { model: District }, { model: Wards }] },
                    { model: Account },
                ],
            });
            res.status(200).json({ companyAccount });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default CompanyAccountController;
