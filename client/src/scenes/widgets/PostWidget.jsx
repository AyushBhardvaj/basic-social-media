import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state/postSlice";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  postImage,
  userProfilepic,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          // body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      alert(error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comment`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ description: comment }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setComment("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userProfilepic={userProfilepic}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {postImage && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={postImage}
        />
      )}
      <Box mt="0.25rem" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" width="100%">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </Box>
        {isComments && (
          <Box mt="0.5rem" sx={{ display: "flex", flexDirection: "column" }}>
            <form
              onSubmit={addComment}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "1rem",
                backgroundColor: palette.neutral.light,
                padding: "0 1rem",
              }}
            >
              <InputBase
                required
                type="string"
                placeholder="Add your comment..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                sx={{
                  width: "100%",
                  height: "3rem",
                  backgroundColor: palette.neutral.light,
                  borderRadius: "0.5rem",
                  paddingY: "1rem",
                }}
              />
              <Button type="submit">Add</Button>
            </form>
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment.description}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default PostWidget;
