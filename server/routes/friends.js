import express from "express";
import { getUserFriends, addRemoveFriend } from "../controllers/friends.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

/* UPDATE */
router.patch("/:friendId", verifyToken, addRemoveFriend);
/* READ */
router.get("/", verifyToken, getUserFriends);

export default router;
