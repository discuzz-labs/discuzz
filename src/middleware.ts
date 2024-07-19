import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const {
      nextUrl: { pathname },

      nextauth: { token },
    } = req;

    if (pathname.startsWith("/sign-in") && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (["/", "/dashboard"].includes(pathname) && !token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const {
          nextUrl: { pathname },
        } = req;

        return (!token && pathname.startsWith("/sign-in")) || !!token;
      },
    },
    secret: process.env.APP_KEY,
    pages: {
      signIn: "sign-in"
    }
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], // will execute the middleware on every route
};
