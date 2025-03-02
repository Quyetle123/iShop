import { Address, District, Province, Wards } from "../models/index.js";

class AdressController {
  static async addAdress(req, res) {
    const data = req.body;
    try {
      const address = await Address.create(data);
      res.status(200).json({ address });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async addMainAddress(req, res) {
    const {address, province_id, district_id, wards_id, accountid, oldMainAddress} = req.body;
    try {
      const oldAddress = await Address.findByPk(oldMainAddress);
      if (oldAddress) {
        const mainAddress = await Address.create({address, province_id, district_id, wards_id, accountid, is_default: true});
        await oldAddress.update({ is_default: false });
        res.status(200).json({ mainAddress });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateMainAddress(req, res) {
    const { id } = req.params;
    const {oldMainAddress} = req.body;
    try {
      const address = await Address.findByPk(id);
      const oldAddress = await Address.findByPk(oldMainAddress);
      if (address && oldAddress) {
        await address.update({ is_default: true });
        await oldAddress.update({ is_default: false });
        res.status(200).json({ address });
      } else {
        res.status(404).json({ message: "Adress not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async AllAdresses(req, res) {
    try {
      const addresses = await Address.findAll();
      res.status(200).json({ addresses });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async MainAddress(req, res) {
    const { accountid } = req.params;
    try {
      const mainAddress = await Address.findOne({
        where: {
          accountid,
          is_default: true,
        },
        include: [
          {
            model: Wards,
            include: [
              {
                model: District,
                include: [
                  {
                    model: Province,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (mainAddress) {
        res.status(200).json({ mainAddress });
      } else {
        res.status(404).json({ message: "Address not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async AddressByAccountId(req, res) {
    const { accountid } = req.params;
    try {
      const addresses = await Address.findAll({
        where: {
          accountid,
          is_default: false,
        },
        include: [
          {
            model: Wards,
            include: [
              {
                model: District,
                include: [
                  {
                    model: Province,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (addresses) {
        res.status(200).json({ addresses });
      } else {
        res.status(404).json({ message: " Adress not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async AdressById(req, res) {
    const { id } = req.params;
    try {
      const address = await Address.findOne({
        where: { id },
        include: [
          {
            model: Wards,
            include: [
              {
                model: District,
                include: [
                  {
                    model: Province,
                  },
                ],
              },
            ],
          },
        ],
      });
      if (address) {
        res.status(200).json({ address });
      } else {
        res.status(404).json({ message: "Adress not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateAdress(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const adress = await Address.findByPk(id);
      if (adress) {
        await adress.update(data);
        res.status(200).json({ adress });
      } else {
        res.status(404).json({ message: "Adress not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteAdress(req, res) {
    const { id } = req.params;
    try {
      const adress = await Address.findByPk(id);
      if (adress) {
        await adress.destroy();
        res.status(200).json({ message: "Adress deleted susccessfully" });
      } else {
        res.status(404).json({ message: "Adress not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default AdressController;
