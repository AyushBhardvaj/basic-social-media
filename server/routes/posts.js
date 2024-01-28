import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  getUserPosts,
  getFeedposts,
  likePost,
  commentPost,
} from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedposts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:postId/like", verifyToken, likePost);
router.patch("/:postId/comment", verifyToken, commentPost);

export default router;
