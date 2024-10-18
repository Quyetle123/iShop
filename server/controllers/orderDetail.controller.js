import { OrderDetail } from "../models/index.js";

class orderDetailController {
  static async addOrderDetail(req, res) {
    const data = req.body;
    try {
      const orderDetail = await OrderDetail.create(data);
      res.status(200).json({ orderDetail });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default orderDetailController;
