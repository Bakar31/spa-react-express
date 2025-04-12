import express from "express";
import passport from "passport";
import { AuthController } from "./auth.controller";
import { validateLogin, validateRegister } from "./auth.validator";
import { authenticate } from "../../middlewares/auth.middleware";

export const authRoutes = express.Router();

authRoutes.post("/register", validateRegister, AuthController.register);
authRoutes.post("/login", validateLogin, AuthController.login);

// Google OAuth routes
authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  AuthController.googleCallback
);

// Get current user
authRoutes.get("/me", authenticate, AuthController.me);