import { z } from "zod";
import { EUserRole } from "@prisma/client";

export interface ITokenPayload {
  sub: string;
  email: string;
  role: EUserRole;
  iat?: number;
  exp?: number;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: EUserRole;
  };
}

export const registerUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
});

export type TRegisterUser = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type TLoginUser = z.infer<typeof loginUserSchema>;