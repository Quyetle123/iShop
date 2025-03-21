import { Branch, Province, Store } from "../models/index.js";

class branchController {
  static async addBranch(req, res) {
    const { province_id, description } = req.body;
    try {
      const branch = await Branch.create({
        id: province_id,
        province_id,
        description,
      });
      res.status(200).json({ branch });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getAllBranches(req, res) {
    try {
      const branches = await Branch.findAll({
        include: [{ model: Store }, { model: Province }],
      });
      res.status(200).json({ branches });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default branchController;
