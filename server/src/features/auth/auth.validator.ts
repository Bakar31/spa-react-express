import { Request, Response, NextFunction } from "express";
import { loginUserSchema, registerUserSchema } from "./auth.types";

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  try {
    registerUserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    loginUserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};