import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const privatePaths = [
    "/about-us",
    "/categories",
    "/categories/addCategories",
    "/categories/addSubCategories",
    "/categories/subCategories",
    "/dashboard",
    "/faqs",
    "/guideline",
    "/push-notification",
    "/support",
  ];
  const isPrivatePath = privatePaths.includes(path);

  const token = request.cookies.get("session")?.value;

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/forget-password",
    "/reset-password",
    "/about-us",
    "/categories",
    "/categories/addCategories",
    "/categories/addSubCategories",
    "/categories/subCategories",
    "/dashboard",
    "/faqs",
    "/guideline",
    "/push_notification",
    "/support",
  ],
};
