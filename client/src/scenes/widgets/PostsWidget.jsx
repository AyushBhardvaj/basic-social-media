import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/postSlice";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const posts = useSelector((state) => state.posts.posts);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const getPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const postsArray = await response.json();
    if (postsArray) {
      dispatch(setPosts({ posts: postsArray }));
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const postsArray = await response.json();
    if (postsArray) {
      dispatch(setPosts({ posts: postsArray }));
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {posts?.map(
        ({ _id, postAuthor, description, postImage, likes, comments }) => {
          return (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={postAuthor?._id}
              name={`${postAuthor?.firstName} ${postAuthor?.lastName}`}
              description={description}
              location={postAuthor.location}
              postImage={postImage?.url}
              userProfilepic={postAuthor?.profilePic?.url}
              likes={likes}
              comments={comments}
            />
          );
        }
      )}
    </>
  );
};

export default PostsWidget;
