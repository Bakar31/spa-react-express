import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi } from "../api/blogApi";
import { useToast } from "@/hooks/use-toast";
import { TBlogPostInput } from "@/types/blog.types";

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: TBlogPostInput) => blogApi.createPost(data),
    onSuccess: () => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Blog post created",
        description: "Your blog post has been successfully created.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create blog post",
        description: error.response?.data?.message || "An error occurred while creating the blog post.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateBlogPost = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Partial<TBlogPostInput>) => blogApi.updatePost(id, data),
    onSuccess: () => {
      // Invalidate and refetch specific blog and blogs list
      queryClient.invalidateQueries({ queryKey: ['blog', id] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Blog post updated",
        description: "Your blog post has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update blog post",
        description: error.response?.data?.message || "An error occurred while updating the blog post.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => blogApi.deletePost(id),
    onSuccess: () => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Blog post deleted",
        description: "Your blog post has been successfully deleted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete blog post",
        description: error.response?.data?.message || "An error occurred while deleting the blog post.",
        variant: "destructive",
      });
    },
  });
};