import { Color } from "../models/index.js";

class colorController {
  static async addColor(req, res) {
    const data = req.body;
    try {
      const color = await Color.create(data);
      res.status(200).json({ color });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllColor(req, res) {
    try {
      const colors = await Color.findAll({
        order: [["id", "DESC"]],
      });
      res.status(200).json({ colors });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default colorController;
