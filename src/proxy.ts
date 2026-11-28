import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookie,
  locales,
  type Locale,
} from "@/i18n/config";

function getPreferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value;

  if (saved && isLocale(saved)) {
    return saved;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);

  const destination = request.nextUrl.clone();

  destination.pathname =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  destination.search = search;

  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
