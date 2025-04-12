import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface IAppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: IAppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  
  if (err instanceof ZodError) {
    res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: err.errors,
    });
    return;
  }

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};