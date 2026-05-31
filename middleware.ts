import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n/config";

function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (accept.startsWith("ar")) return "ar";
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};