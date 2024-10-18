import express from "express";
import commentController from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/addComment", commentController.addComment);

export default router;