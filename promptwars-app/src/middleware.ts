import { NextRequest, NextResponse } from "next/server";

const ipMap = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 30, WINDOW = 60_000; // 30 requests per minute

export function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW });
  } else if (entry.count >= LIMIT) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return new NextResponse("Rate limit exceeded", {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    });
  } else {
    entry.count++;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
