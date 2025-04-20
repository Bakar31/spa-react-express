import { IBlogPost, TBlogPostInput } from "@/types/blog.types";

export interface IBlogPostFormProps {
  initialData?: IBlogPost;
  isSubmitting: boolean;
  onSubmit: (data: TBlogPostInput) => void;
}
