import Post from "../models/Post.js";

class PostController {
  static async addPost(req, res) {
    const data = req.body;
    try {
      const post = await Post.create(data);
      res.status(200).json({ post });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async allPosts(req, res) {
    try {
      const posts = await Post.findAll();
      res.status(200).json({ posts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async postById(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (post) {
        res.status(200).json({ post });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updatePost(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const post = await Post.findByPk(id);
      if (post) {
        await post.update(data);
        res.status(200).json({ post });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default PostController;
