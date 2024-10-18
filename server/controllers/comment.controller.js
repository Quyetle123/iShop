import { Comment } from "../models/index.js";

class commentController {
  static async addComment(req, res) {
    const data = req.body;
    try {
      const comment = await Comment.create(data);
      res.status(200).json({ comment });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default commentController;
