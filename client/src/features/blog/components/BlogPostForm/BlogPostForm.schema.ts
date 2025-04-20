import { z } from "zod";
import { EBlogStatus } from "@/constants/enums";

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  content: z
    .string()
    .min(100, { message: "Content must be at least 100 characters" })
    .max(50000, { message: "Content cannot exceed 50,000 characters" }),
  status: z.nativeEnum(EBlogStatus, {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag cannot be empty" })
        .max(20, { message: "Tag cannot exceed 20 characters" })
    )
    .min(1, { message: "Please add at least one tag" })
    .max(5, { message: "Cannot add more than 5 tags" }),
  featuredImage: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .nullable(),
});

export type TBlogPostFormValues = z.infer<typeof blogPostSchema>;
