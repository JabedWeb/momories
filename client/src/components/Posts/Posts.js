import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";
import { getPosts } from "../../actions/posts"; // Import the getPosts action

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));
  //const userPosts = posts.filter((post) => post.email === user?.result?.email);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (!user && !isLoading) return "Please Sign In to create your own memories and like other's memories.";

  if (!posts.length && !isLoading) return "No posts, create one now!";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
