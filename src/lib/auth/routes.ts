export const AUTH_ROUTES = ["/login", "/otp"] as const;

export const PUBLIC_ROUTES = [
  "/login",
  "/otp",
  "/offline",
  "/regulamin",
  "/polityka-prywatnosci",
  "/kontakt",
] as const;

export const FULLSCREEN_ROUTES = ["/skanuj", "/promocje/gazetka"] as const;

export function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname === route);
}

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname === route);
}

export function isFullscreenRoute(pathname: string) {
  return FULLSCREEN_ROUTES.some((route) => pathname === route);
}
