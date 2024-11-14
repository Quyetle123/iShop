import Notify from "../models/Notify.js";


class notifyController {
  static async addNotitfy(req, res) {
    const data = req.body;
    try {
      const notify = await Notify.create(data);
      res.status(200).json({ notify });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getNotifyByAccountId(req, res) {
    const { accountid } = req.params;
    try {
      const notify = await Notify.findAll({
        where: {
          accountid,
        },
      });
      res.status(200).json({ notify });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteNotify(req, res) {
    const { id } = req.params;
    try {
      const notify = await Notify.findByPk(id);
      if (notify) {
        await notify.destroy();
        res.status(200).json({ message: "Notify deleted successfully" });
      } else {
        res.status(404).json({ message: "Notify not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default notifyController;
