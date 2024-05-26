import express from "express";

import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  likePost,
  deletePost,
  commentPost,
  sortPostsByDate,
} from "../controllers/posts.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);
router.get("/sort", sortPostsByDate)

export default router;
