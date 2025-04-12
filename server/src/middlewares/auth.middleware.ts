import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "@prisma/client";

export interface IAuthRequest extends Request {
  user?: User;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: User) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    (req as IAuthRequest).user = user;
    next();
  })(req, res, next);
};

export const authorize = (roles: string[]) => {
  return (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};