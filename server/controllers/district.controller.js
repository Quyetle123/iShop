import { District } from "../models/index.js";

class DistrictController {
    static async getDistrictByProvinceId(req, res) {
        const { province_id } = req.params;
    try {
      const district = await District.findAll({
        where: {
          province_id,
        },
      })
      if (district) {
        res.status(200).json({ district });
      } else {
        res.status(404).json({ message: "district not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }
}

export default DistrictController;