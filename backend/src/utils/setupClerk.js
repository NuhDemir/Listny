import { clerkMiddleware } from "@clerk/express";

export const setupClerk = (app) => {
  app.use(
    clerkMiddleware({
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    })
  );
};
