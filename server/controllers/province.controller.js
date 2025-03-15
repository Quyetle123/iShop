import { Province } from "../models/index.js";

class ProvinceController {
    static async getAllProvince(req, res) {
        try {
            const province = await Province.findAll();
            res.status(200).json({ province });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default ProvinceController;