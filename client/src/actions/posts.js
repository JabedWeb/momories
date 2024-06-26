import {
  FETCH_ALL,
  FETCH_POSTS_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENTS,
  FETCH_SORTED_POSTS,
} from "../constants/actionTypes";
import * as api from "../api/index.js";
import { toast } from 'react-toastify';


export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostById(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_POSTS_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


export const getPostsByDate = (sort) => async (dispatch) => {
  try {
    const { data } = await api.sortPostsByDate(sort);
    dispatch({ type: FETCH_SORTED_POSTS, payload: data });
  } catch (error) {
    console.error('Error sorting posts by date:', error);
  }
};
export const createPost = (post, history) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    history.push("/");
    dispatch({ type: CREATE, payload: data });
    toast.success('Post created successfully!');
  } catch (error) {
    toast.success('Post created successfully!');
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
    dispatch(getPosts()); // Fetch posts after update
    dispatch({ type: 'END_LOADING' });
    toast.success('Post updated successfully!');
  } catch (error) {
    toast.error('Failed to update post!');
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likePost(id, user?.token);
  
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(comment, id);
    dispatch({ type: COMMENTS, payload: data });
    toast.success('Comment added successfully!');
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id, history) => async (dispatch) => {
  try {
    await api.deletePost(id);
    history.push("/");
    dispatch({ type: DELETE, payload: id });
    toast.success('Post deleted successfully!');
  } catch (error) {
    toast.error('Failed to delete post!');
    console.log(error);
  }
};
