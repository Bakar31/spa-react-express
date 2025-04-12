import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { IAuthRequest } from "../../middlewares/auth.middleware";
import { User } from "@prisma/client";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authResponse = await AuthService.register(req.body);
      res.status(201).json(authResponse);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authResponse = await AuthService.login(req.body);
      res.status(200).json(authResponse);
    } catch (error) {
      next(error);
    }
  }

  static async googleCallback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user as User;
      const authResponse = await AuthService.googleAuthCallback(user);
      
      // Redirect to frontend with token
      const token = encodeURIComponent(authResponse.token);
      res.redirect(`${process.env.CLIENT_URL}/auth/google-callback?token=${token}`);
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as IAuthRequest).user;
      
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }
}