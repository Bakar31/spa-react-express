import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LogOut,
  User,
  Menu,
  X,
  Home,
  BookOpen,
  LayoutDashboard,
  PenLine,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext/AuthContext.provider";

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container max-w-7xl flex h-14 items-center justify-between px-4 md:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center">
              <span className="font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              MyApp
            </span>
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex mx-6">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/blog">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {isAuthenticated ? (
              <>
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/blog/create">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <PenLine className="mr-2 h-4 w-4" />
                      Create Post
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            ) : null}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full overflow-hidden border border-border hover:bg-accent transition-colors duration-300"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <div className="p-2">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2" />
                  <div className="grid gap-1">
                    <DropdownMenuItem className="flex items-center py-2 cursor-pointer rounded-md transition-colors">
                      <User className="mr-3 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={signOut}
                      className="flex items-center py-2 cursor-pointer rounded-md transition-colors text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <nav className="hidden md:flex space-x-3">
              <Button asChild variant="ghost" className="px-4">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild className="px-4 shadow-sm">
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </nav>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-md">
          <nav className="container px-4 py-6 flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center px-4 py-3 text-lg rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              <Home className="mr-3 h-5 w-5" />
              Home
            </Link>
            <Link
              to="/blog"
              className="flex items-center px-4 py-3 text-lg rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Blog
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-3 text-lg rounded-md hover:bg-accent"
                  onClick={toggleMobileMenu}
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/blog/create"
                  className="flex items-center px-4 py-3 text-lg rounded-md hover:bg-accent"
                  onClick={toggleMobileMenu}
                >
                  <PenLine className="mr-3 h-5 w-5" />
                  Create Post
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center py-6"
                >
                  <Link to="/auth/signin" onClick={toggleMobileMenu}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full justify-center py-6">
                  <Link to="/auth/signup" onClick={toggleMobileMenu}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
