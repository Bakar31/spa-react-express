import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBlogPost } from "@/features/blog/hooks/useCreateBlogPost";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TBlogPostInput } from "@/types/blog.types";
import BlogPostForm from "../components/BlogPostForm";

export const BlogCreatePage = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateBlogPost();

  const handleSubmit = async (data: TBlogPostInput) => {
    try {
      setError(null);
      const newPost = await mutateAsync(data);
      navigate(`/blog/${newPost.id}`);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to create blog post. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <BlogPostForm isSubmitting={isPending} onSubmit={handleSubmit} />
    </div>
  );
};
