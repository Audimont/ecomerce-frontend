import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  REFRESH_COOKIE,
  getAuthCookies,
} from "./lib/actions/auth/auth-cookies";

const unauthenticatedRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/password-reset",
  "/auth/email-verify",
];

export async function middleware(request: NextRequest) {
  const authenticated = !!cookies().get(AUTH_COOKIE)?.value;

  if (!authenticated && cookies().get(REFRESH_COOKIE)) {
    const refreshRes = await fetch(`${process.env.API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: cookies().get(REFRESH_COOKIE)?.value.toString() as string,
      },
    });

    const authCookies = getAuthCookies(refreshRes);
    if (authCookies?.accessToken && authCookies?.refreshToken) {
      const response = NextResponse.redirect(request.url);
      response.cookies.set(authCookies.accessToken);
      response.cookies.set(authCookies.refreshToken);
      return response;
    }
  }

  if (
    !authenticated &&
    !unauthenticatedRoutes.some((route) => request.url.includes(route))
  ) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
