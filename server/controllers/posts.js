import Post from "../models/Post.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
  try {
    const { description, pictureUrl = "" } = req.body;

    const newPost = new Post({
      postAuthor: req.user._id,
      description,
      likes: [],
    });
    if (pictureUrl) {
      const myCloud = await cloudinary.uploader.upload(pictureUrl, {
        folder: "Fan_field",
        width: 150,
        crop: "scale",
      });
      newPost.postImage = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    await newPost.save();
    const post = await Post.find().populate(
      "postAuthor",
      "_id firstName lastName profilePic location"
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* READ */
const getFeedposts = async (req, res) => {
  try {
    const post = await Post.find({
      $or: [
        {
          postAuthor: { $in: req.user.friends },
        },
        { postAuthor: req.user._id },
      ],
    }).populate("postAuthor", "_id firstName lastName profilePic location");

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ postAuthor: userId }).populate(
      "postAuthor",
      "_id firstName lastName profilePic location"
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const post = await Post.findById(postId);
  const isLiked = post.likes.get(userId);
  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { likes: post.likes },
    { new: true }
  ).populate("postAuthor", "_id firstName lastName profilePic location");
  res.status(200).json(updatedPost);
};

const commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    post.comments.push({
      commentAuthor: req.user._id,
      description: req.body.description,
    });
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { comments: post.comments },
      { new: true }
    ).populate("postAuthor", "_id firstName lastName profilePic location");
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { createPost, getUserPosts, getFeedposts, likePost, commentPost };
