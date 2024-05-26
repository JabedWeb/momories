import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 8;
    // getting the starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  console.log(req.query);
  const { searchQuery, tags,sort } = req.query;
  try {
    if(searchQuery === 'none' && tags === 'none' && sort === 'asc'){
      const posts = await PostMessage.find().sort({ createdAt: 1 });
      res.json(posts);
    }
    else if(searchQuery === 'none' && tags === 'none' && sort === 'desc'){
      const posts = await PostMessage.find().sort({ createdAt: -1 });
      res.json(posts);
    }
    else if(sort === 'asc'){
      const posts = await PostMessage.find({
        $or: [{ title: { $regex: searchQuery, $options: "i" } }, { tags: { $in: tags.split(",") } },],
      }).sort({ createdAt: 1 });
      res.json(posts);
    }else {
      const posts = await PostMessage.find({
        $or: [{ title: { $regex: searchQuery, $options: "i" } }, { tags: { $in: tags.split(",") } },],
      }).sort({ createdAt: -1 });
      res.json(posts);
    }
    // const title = new RegExp(searchQuery, "i");
    // const posts = await PostMessage.find({
    //   $or: [{ title }, { tags: { $in: tags.split(",") } },],
    // });
    // console.log(posts);
    // res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsByDate = async (req, res) => {
  
  const { sort } = req.query;

  console.log(`Sorting posts by: ${sort}`);

  try {
    const sortOrder = sort === 'asc' ? 1 : -1;
    const posts = await PostMessage.find().sort({ createdAt: sortOrder });
    res.status(200).json(posts);
  } catch (error) {
    console.error(`Error sorting posts: ${error.message}`);
    res.status(404).json({ message: 'Error fetching posts' });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: post.createdAt || new Date().toISOString(),  // Ensure createdAt is set
  });

  try {
    await newPostMessage.save();
   // console.log(`Post created: ${newPostMessage}`);
    res.status(201).json(newPostMessage);
  } catch (error) {
    console.error(`Error creating post: ${error.message}`);
    res.status(409).json({ message: 'Error creating post' });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, tags, selectedFile, createdAt } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { title, message, creator, tags, selectedFile, createdAt, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(comment);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export default router;
