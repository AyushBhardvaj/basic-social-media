import express from "express";
import { getUser, searchUser } from "../controllers/users.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/search", verifyToken, searchUser);
router.get("/:id", verifyToken, getUser);

export default router;