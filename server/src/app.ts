import "./config/passport";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import passport from "passport";

import { errorHandler } from "./middlewares/error.middleware";
import { authRoutes } from "./features/auth/auth.routes";
import { blogRoutes } from "./features/blog/blog.routes";

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

// Root route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the React Express SPA Template API" });
});

// Health check route
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
