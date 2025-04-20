import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EBlogStatus } from "@/constants/enums";
import { Loader2, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TBlogPostInput } from "@/types/blog.types";
import { IBlogPostFormProps } from "./BlogPostForm.types";
import { blogPostSchema } from "./BlogPostForm.schema";

const BlogPostForm = ({
  initialData,
  isSubmitting,
  onSubmit,
}: IBlogPostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TBlogPostInput>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      status: initialData?.status || EBlogStatus.DRAFT,
      tags: initialData?.tags || [],
      featuredImage: initialData?.featuredImage || "",
    },
  });

  const tags = watch("tags", []);

  useEffect(() => {
    if (initialData?.status) {
      setValue("status", initialData.status);
    }
  }, [initialData, setValue]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.trim();

      if (value && tags.length < 5 && !tags.includes(value)) {
        setValue("tags", [...tags, value]);
        input.value = "";
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleStatusChange = (value: string) => {
    setValue("status", value as EBlogStatus);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Blog Post" : "Create New Blog Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="blog-post-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter your blog post title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="Write your blog post content here..."
              className={`min-h-[300px] ${errors.content ? "border-red-500" : ""}`}
            />
            {errors.content && (
              <span className="text-sm text-red-500">
                {errors.content.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={initialData?.status || EBlogStatus.DRAFT}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EBlogStatus.DRAFT}>Draft</SelectItem>
                <SelectItem value={EBlogStatus.PUBLISHED}>Published</SelectItem>
                <SelectItem value={EBlogStatus.ARCHIVED}>Archived</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <span className="text-sm text-red-500">
                {errors.status.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (press Enter to add)</Label>
            <Input
              id="tags"
              placeholder="Add tags..."
              onKeyDown={handleAddTag}
              className={errors.tags ? "border-red-500" : ""}
            />
            {errors.tags && (
              <span className="text-sm text-red-500">
                {typeof errors.tags.message === "string"
                  ? errors.tags.message
                  : "Tags are required"}
              </span>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                >
                  {tag}
                  <XCircle
                    className="ml-1 h-4 w-4 cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featuredImage">Featured Image URL (optional)</Label>
            <Input
              id="featuredImage"
              {...register("featuredImage")}
              placeholder="https://example.com/image.jpg"
              className={errors.featuredImage ? "border-red-500" : ""}
            />
            {errors.featuredImage && (
              <span className="text-sm text-red-500">
                {errors.featuredImage.message}
              </span>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit" form="blog-post-form" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : initialData ? (
            "Update Post"
          ) : (
            "Create Post"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostForm;
