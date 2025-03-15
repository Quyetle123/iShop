import { Op } from "sequelize";
import { VoucherAccount, VoucherProduct, Vourcher } from "../models/index.js";

class VourcherController {
  static async addVourcher(req, res) {
    const data = req.body;
    try {
      const vourcher = await Vourcher.create(data);
      res.status(200).json({ vourcher });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async allVourchers(req, res) {
    try {
      await Vourcher.update(
        { status: false },
        { where: { valid_to: { [Op.lt]: new Date() }, status: true } }
      );
  
      const vourchers = await Vourcher.findAll({
        where: { status: true },
        include: [
          {
            model: VoucherAccount,
          },
          {
            model: VoucherProduct,
          },
        ],
      });
  
      res.status(200).json({ vourchers });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  

  static async vourcherById(req, res) {
    const { id } = req.params;
    try {
      const vourcher = await Vourcher.findByPk(id);
      if (vourcher) {
        res.status(200).json({ vourcher });
      } else {
        res.status(404).json({ message: "vourcher not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateVourcher(req, res) {
    const { id } = req.params();
    const data = req.body;
    try {
      const vourcher = await Vourcher.findByPk(id);
      if (vourcher) {
        await vourcher.update(data);
        res.status(200).json({ vourcher });
      } else {
        res.status(404).json({ message: "vourcher not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteVourcher(req, res) {
    const { id } = req.params;
    try {
      const vourcher = await Vourcher.findByPk(id);
      if (vourcher) {
        await vourcher.destroy();
        res.status(200).json({ message: "vourcher deleted successfully" });
      } else {
        res.status(404).json({ message: "vourcher not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default VourcherController;
