import { Request, Response, NextFunction } from "express";
import { createPostSchema, updatePostSchema } from "./blog.types";

export const validateCreatePost = (req: Request, res: Response, next: NextFunction): void => {
  try {
    createPostSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUpdatePost = (req: Request, res: Response, next: NextFunction): void => {
  try {
    updatePostSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
