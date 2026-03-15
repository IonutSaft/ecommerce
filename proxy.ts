import { auth } from "@/lib/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProfileRoute = nextUrl.pathname.startsWith("/profile");
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (isProfileRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
