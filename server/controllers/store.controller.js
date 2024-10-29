import { Store } from "../models/index.js";

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
}

export default storeController;
