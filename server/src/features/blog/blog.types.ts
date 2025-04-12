import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  published: z.boolean().default(false),
});

export type TCreatePost = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  content: z.string().min(10, "Content must be at least 10 characters").optional(),
  published: z.boolean().optional(),
});

export type TUpdatePost = z.infer<typeof updatePostSchema>;