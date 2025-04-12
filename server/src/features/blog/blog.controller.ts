import { Response, NextFunction } from "express";
import { BlogService } from "./blog.service";
import { IAuthRequest } from "../../middlewares/auth.middleware";

export class BlogController {
  static async getAllPosts(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      // If user is authenticated, get all their posts
      // Otherwise, get only published posts
      const posts = await BlogService.getAllPosts(req.user?.id);
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async getMyPosts(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const posts = await BlogService.getAllPosts(req.user.id);
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const post = await BlogService.getPostById(id);

      // If post is not published and user is not the author, deny access
      if (!post.published && post.authorId !== req.user?.id) {
        res.status(403).json({ message: "Not authorized to view this post" });
        return;
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async createPost(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const post = await BlogService.createPost(req.body, req.user.id);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { id } = req.params;
      const post = await BlogService.updatePost(id, req.user.id, req.body);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { id } = req.params;
      await BlogService.deletePost(id, req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}