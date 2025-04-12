import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/database";
import { EAuthProvider, User } from "@prisma/client";
import { env } from "../../config/env";
import { IAuthResponse, ITokenPayload, TLoginUser, TRegisterUser } from "./auth.types";
import { IAppError } from "../../middlewares/error.middleware";

export class AuthService {
  static async register(userData: TRegisterUser): Promise<IAuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      const error = new Error("User with this email already exists") as IAppError;
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        provider: EAuthProvider.LOCAL,
      },
    });

    const token = this.generateToken(newUser);

    return {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    };
  }

  static async login(credentials: TLoginUser): Promise<IAuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user || !user.password) {
      const error = new Error("Invalid credentials") as IAppError;
      error.statusCode = 401;
      throw error;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid credentials") as IAppError;
      error.statusCode = 401;
      throw error;
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  static generateToken(user: User): string {
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: typeof env.JWT_EXPIRES_IN === "string" ? parseInt(env.JWT_EXPIRES_IN, 10) : env.JWT_EXPIRES_IN,
    });
  }

  static async googleAuthCallback(user: User): Promise<IAuthResponse> {
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  static async me(userId: string): Promise<Omit<User, "password" | "refreshToken">> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        provider: true,
        providerId: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      const error = new Error("User not found") as IAppError;
      error.statusCode = 404;
      throw error;
    }

    return user;
  }
}