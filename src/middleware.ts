import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { featuresConfig } from "./config/features";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (!featuresConfig.quiz) {
    const { pathname } = request.nextUrl;
    if (/^(?:\/(uz|ru|en))?\/test(?:\/|$)/.test(pathname)) {
      const matchedLocale =
        pathname.match(/^\/(uz|ru|en)(?:\/|$)/)?.[1] || routing.defaultLocale;
      return NextResponse.rewrite(
        new URL(`/${matchedLocale}/__route-disabled__`, request.url)
      );
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(uz|ru|en)/:path*",
    // Enable redirects that add missing locales
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
