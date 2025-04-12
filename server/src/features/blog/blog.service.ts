import { Post } from "@prisma/client";
import { prisma } from "../../config/database";
import { TCreatePost, TUpdatePost } from "./blog.types";
import { IAppError } from "../../middlewares/error.middleware";

export class BlogService {
  static async getAllPosts(userId?: string): Promise<Post[]> {
    const where = userId ? { authorId: userId } : { published: true };
    
    return prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  static async getPostById(postId: string): Promise<Post> {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      const error = new Error("Post not found") as IAppError;
      error.statusCode = 404;
      throw error;
    }

    return post;
  }

  static async createPost(data: TCreatePost, authorId: string): Promise<Post> {
    return prisma.post.create({
      data: {
        ...data,
        author: {
          connect: { id: authorId },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  static async updatePost(postId: string, userId: string, data: TUpdatePost): Promise<Post> {
    // Verify post exists and belongs to the user
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      const error = new Error("Post not found") as IAppError;
      error.statusCode = 404;
      throw error;
    }

    if (post.authorId !== userId) {
      const error = new Error("Not authorized to update this post") as IAppError;
      error.statusCode = 403;
      throw error;
    }

    return prisma.post.update({
      where: { id: postId },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  static async deletePost(postId: string, userId: string): Promise<void> {
    // Verify post exists and belongs to the user
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      const error = new Error("Post not found") as IAppError;
      error.statusCode = 404;
      throw error;
    }

    if (post.authorId !== userId) {
      const error = new Error("Not authorized to delete this post") as IAppError;
      error.statusCode = 403;
      throw error;
    }

    await prisma.post.delete({
      where: { id: postId },
    });
  }
}
