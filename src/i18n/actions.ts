"use server";

import { cookies } from "next/headers";
import { isLocale, localeCookie, type Locale } from "./config";

export async function setLocalePreference(locale: Locale): Promise<void> {
  if (!isLocale(locale)) {
    throw new Error("Unsupported locale");
  }

  const cookieStore = await cookies();

  cookieStore.set(localeCookie, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}
