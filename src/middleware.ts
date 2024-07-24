import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import routes from "@/services/routes";

export default withAuth(
  async function middleware(req) {
    const { nextUrl: { pathname }, nextauth: { token } } = req;

    // Caution: if-statements order matters
    if (routes.isAuth(pathname) && token && token.verified === false) {
      return NextResponse.redirect(new URL(routes.redirects.onUnVerified, req.url));
    }

    if (routes.isAuth(pathname) && token) {
      return NextResponse.redirect(new URL(routes.redirects.onAuthenticated, req.url));
    }

    if (routes.isProtected(pathname) && !token) {
      return NextResponse.redirect(new URL(routes.redirects.onUnAuthenticated, req.url));
    }

    if (routes.isVerifyRoute(pathname) && token && token.verified === true) {
      return NextResponse.redirect(new URL(routes.redirects.onVerified, req.url));
    }

  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { nextUrl: { pathname } } = req;
        return (!token && routes.isAuth(pathname)) || !!token;
      },
    },
    secret: process.env.APP_KEY,
    pages: {
      signIn: routes.auth.signIn.path,
    },
  }
);

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard", "/verify", "/"],
};