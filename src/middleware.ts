import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { featuresConfig } from "./config/features";
import { isIndexingEnabled } from "./config/siteConfig";

const intlMiddleware = createMiddleware(routing);

function withRuntimeSecurityHeaders(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  const forwardedProto = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim()
    .toLowerCase();
  const urlProto = request.nextUrl.protocol.replace(":", "").toLowerCase();

  // Emit HSTS strictly over verified HTTPS requests so local/HTTP previews are never poisoned
  if (forwardedProto === "https" || urlProto === "https") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  // Enforce search engine protection at HTTP header level whenever indexing is disabled
  if (!isIndexingEnabled) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export default function middleware(request: NextRequest) {
  if (!featuresConfig.quiz) {
    const { pathname } = request.nextUrl;
    if (/^(?:\/(uz|ru|en))?\/test(?:\/|$)/.test(pathname)) {
      const matchedLocale =
        pathname.match(/^\/(uz|ru|en)(?:\/|$)/)?.[1] || routing.defaultLocale;
      return withRuntimeSecurityHeaders(
        request,
        NextResponse.rewrite(
          new URL(`/${matchedLocale}/__route-disabled__`, request.url)
        )
      );
    }
  }

  return withRuntimeSecurityHeaders(request, intlMiddleware(request));
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
