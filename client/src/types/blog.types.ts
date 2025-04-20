import { EBlogStatus } from "@/constants/enums";
import { IUser } from "./auth.types";

export interface IBlogPost {
  id: string;
  title: string;
  content: string;
  status: EBlogStatus;
  author: IUser;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  excerpt: string;
  tags: string[];
  featuredImage?: string;
}

export type TBlogPostInput = {
  title: string;
  content: string;
  status: EBlogStatus;
  tags: string[];
  featuredImage?: string;
};

export type TBlogPostsResponse = {
  posts: IBlogPost[];
  total: number;
  page: number;
  limit: number;
};

export type TBlogQueryParams = {
  page?: number;
  limit?: number;
  status?: EBlogStatus;
  search?: string;
  tag?: string;
};
