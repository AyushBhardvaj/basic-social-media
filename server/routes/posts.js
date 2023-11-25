import express from "express";
import  verifyToken  from '../middleware/auth.js';
import {getUserPosts, getFeedposts, likePost} from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedposts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;