import React from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./Navbar";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

import { BlogListPage } from "@/features/blog/pages/BlogListPage";
import { BlogDetailPage } from "@/features/blog/pages/BlogDetailPage";
import { BlogCreatePage } from "@/features/blog/pages/BlogCreatePage";
import SignInPage from "@/features/auth/pages/SignInPage";
import SignUpPage from "@/features/auth/pages/SignUpPage";
import HomePage from "@/pages/Home";
import DashboardPage from "@/pages/Dashboard";
import NotFoundPage from "@/pages/NotFound";

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-4 md:px-8 md:py-12 max-w-7xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />

          <Route
            path="/auth/signin"
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/create"
            element={
              <ProtectedRoute>
                <BlogCreatePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="bg-muted/50 backdrop-blur-sm border-t border-muted w-full mt-auto">
        <div className="container mx-auto py-8 px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <h3 className="font-semibold text-lg">MyApp</h3>
              <p className="text-sm text-muted-foreground">
                Empowering your digital experience
              </p>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="font-medium text-sm mb-2">Links</span>
                <a
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </a>
                <a
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm mb-2">Legal</span>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
