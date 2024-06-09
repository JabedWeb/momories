import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
import { getPosts } from "../../actions/posts"; 

const MyPosts = ({ setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const {posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (!user) return "Please Sign In to see your own memories.";

  const userPosts = posts.filter((post) => post.email === user?.result?.email);

  if (!userPosts.length && !isLoading) return <h3>No posts yet, create a new one now</h3>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div>
      <h1>My Posts</h1>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {userPosts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={3} lg={2}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyPosts;
