import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const MyPosts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile"));
  const userPosts = posts.filter((post) => post.name === user?.result?.name);

  console.log(posts);
  console.log(userPosts);

  if (!userPosts.length && !isLoading) return <h3>No posts yet,create new one now</h3>;

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

export default MyPosts;
