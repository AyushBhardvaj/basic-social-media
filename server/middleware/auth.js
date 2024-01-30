import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(req.cookies);
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    const decodedId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedId.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default verifyToken;
