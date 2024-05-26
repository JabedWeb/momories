import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile"));
  const userPosts = posts.filter((post) => post.email === user?.result?.email);

  console.log(posts);
  //console.log(userPosts);

  if(!user && !isLoading) return "Please Sign In to create your own memories and like other's memories.";

  if (!userPosts.length && !isLoading) return "No posts,create one now!";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {userPosts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
