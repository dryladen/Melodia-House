import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { directus } from "./lib/directus";
import { readMe } from "@directus/sdk";

// 1. Specify protected and public routes
const protectedRoutes = [
  "/dashboard",
  "/instruments/*",
  "/packages/*",
  "/lessons/*",
  "/payments/*",
  "/logout",
];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const token = (await cookies()).get("directus_session_token")?.value;
  const isLogin = await directus(token).request(readMe({ fields: ["email"] }));
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isLogin) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    isLogin &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
