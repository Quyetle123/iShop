import { Wards } from "../models/index.js";

class WardController {
    static async getWardByDistrictId(req, res) {
        const { district_id } = req.params;
    try {
      const wards = await Wards.findAll({
        where: {
            district_id,
        },
      })
      if (wards) {
        res.status(200).json({ wards });
      } else {
        res.status(404).json({ message: "ward not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    }
}

export default WardController;