import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && req.nextUrl.pathname !== "/sign-in") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    if (auth.userId && req.nextUrl.pathname === "/sign-in") {
      return NextResponse.redirect(new URL("/project/backlog", req.url));
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
