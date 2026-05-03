import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js middleware for request-level security and validation.
 * Runs on every request before it reaches API routes or pages.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers to all responses
  response.headers.set("X-Request-ID", crypto.randomUUID());

  // Block requests with suspicious patterns in API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const contentLength = request.headers.get("content-length");
    // Reject oversized request bodies (max 50KB for API routes)
    if (contentLength && parseInt(contentLength, 10) > 50_000) {
      return NextResponse.json(
        { error: "Request body too large." },
        { status: 413 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Match all API routes and pages, exclude static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
