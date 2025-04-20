import { useQuery } from "@tanstack/react-query";
import { blogApi } from "../api/blogApi";
import { TBlogQueryParams } from "@/types/blog.types";

export const useBlogPosts = (params: TBlogQueryParams = {}) => {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => blogApi.getAllPosts(params),
  });
};

export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogApi.getPostById(id),
    enabled: !!id,
  });
};

export const useBlogPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['blog', 'slug', slug],
    queryFn: () => blogApi.getPostBySlug(slug),
    enabled: !!slug,
  });
};