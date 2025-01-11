import express from "express";
import PostController from "../controllers/post.controller.js";

const router = express.Router()

router.post('/addPost', PostController.addPost);
router.get('/', PostController.allPosts);
router.get('/:id', PostController.postById);
router.put('/updatePost/:id', PostController.updatePost)
router.delete('/deletePost/:id', PostController.deletePost);


export default router