import express from "express";
import { BlogController } from "./blog.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateCreatePost, validateUpdatePost } from "./blog.validator";

export const blogRoutes = express.Router();

// Public routes
blogRoutes.get("/", BlogController.getAllPosts);
blogRoutes.get("/:id", BlogController.getPostById);

// Protected routes
blogRoutes.get("/user/posts", authenticate, BlogController.getMyPosts);
blogRoutes.post("/", authenticate, validateCreatePost, BlogController.createPost);
blogRoutes.put("/:id", authenticate, validateUpdatePost, BlogController.updatePost);
blogRoutes.delete("/:id", authenticate, BlogController.deletePost);