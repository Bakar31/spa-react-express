import axiosInstance from "@/lib/axios";
import {
  IBlogPost,
  TBlogPostInput,
  TBlogPostsResponse,
  TBlogQueryParams,
} from "@/types/blog.types";

const API_BASE = "/blogs";

export const blogApi = {
  getAllPosts: async (
    params: TBlogQueryParams = {}
  ): Promise<TBlogPostsResponse> => {
    const { data } = await axiosInstance.get<TBlogPostsResponse>(API_BASE, {
      params,
    });
    return data;
  },

  getPostById: async (id: string): Promise<IBlogPost> => {
    const { data } = await axiosInstance.get<IBlogPost>(`${API_BASE}/${id}`);
    return data;
  },

  getPostBySlug: async (slug: string): Promise<IBlogPost> => {
    const { data } = await axiosInstance.get<IBlogPost>(
      `${API_BASE}/slug/${slug}`
    );
    return data;
  },

  createPost: async (postData: TBlogPostInput): Promise<IBlogPost> => {
    const { data } = await axiosInstance.post<IBlogPost>(API_BASE, postData);
    return data;
  },

  updatePost: async (
    id: string,
    postData: Partial<TBlogPostInput>
  ): Promise<IBlogPost> => {
    const { data } = await axiosInstance.put<IBlogPost>(
      `${API_BASE}/${id}`,
      postData
    );
    return data;
  },

  deletePost: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_BASE}/${id}`);
  },
};
