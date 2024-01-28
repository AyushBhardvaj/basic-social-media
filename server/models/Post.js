import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    postAuthor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    description: String,
    postImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        commentAuthor: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
