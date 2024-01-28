import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import sendToken from "../utils/sendToken.js";

/* REGISTER USER */
const register = async (req, res) => {
  try {
    console.log("request accepted in login", req.body);

    const {
      firstName,
      lastName,
      email,
      password,
      pictureUrl,
      friends,
      location,
      occupation,
    } = req.body;

    const myCloud = await cloudinary.uploader.upload(pictureUrl, {
      folder: "Fan_field",
      width: 150,
      crop: "scale",
    });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      profilePic: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();

    sendToken(savedUser, 201, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("request accepted in login", req.body);
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ msg: "User does not exist" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    delete user.password;
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({
      success: true,
      user: "logged out",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login, logout };
