import { jwtDecode } from "jwt-decode";

export const AUTH_COOKIE = "Authentication";
export const REFRESH_COOKIE = "Refresh";

export const getAuthCookies = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (!setCookieHeader) {
    return;
  }

  const accessToken = setCookieHeader
    .split(";")
    .find((cookie) => cookie.includes(AUTH_COOKIE))
    ?.split(",")[0];
  const refreshToken = setCookieHeader
    .split(";")
    .find((cookie) => cookie.includes(REFRESH_COOKIE))
    ?.split(",")[1];

  return {
    accessToken: accessToken && {
      name: AUTH_COOKIE,
      value: accessToken,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(accessToken).exp! * 1000),
    },
    refreshToken: refreshToken && {
      name: REFRESH_COOKIE,
      value: refreshToken,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(refreshToken).exp! * 1000),
    },
  };
};
