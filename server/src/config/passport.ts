import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "./env";
import { EAuthProvider } from "@prisma/client";
import { prisma } from "./database";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: payload.sub as string },
        });

        if (!user) {
          return done(null, false);
        }

        return done(null, user || false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Google OAuth Strategy (if credentials are provided)
if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          let user = await prisma.user.findFirst({
            where: {
              OR: [
                { providerId: profile.id, provider: EAuthProvider.GOOGLE },
                { email: profile.emails?.[0].value },
              ],
            },
          });

          if (!user && profile.emails?.[0].value) {
            user = await prisma.user.create({
              data: {
                email: profile.emails[0].value,
                name: profile.displayName,
                provider: EAuthProvider.GOOGLE,
                providerId: profile.id,
                emailVerified: true,
              },
            });
          }

          return done(null, user || false);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
}
