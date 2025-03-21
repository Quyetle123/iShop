import LocationStore from "../models/LocationStore.js";

class locationStoreController {
  static async getAllLocationStore(req, res) {
    try {
      const locationStores = await LocationStore.findAll();
      res.status(200).json({ locationStores });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default locationStoreController;
