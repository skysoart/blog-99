import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith("/articles/new")) {
    return NextResponse.next()
  }

  const user = process.env.AUTH_USERNAME
  const pass = process.env.AUTH_PASSWORD

  // If creds are not set, block access entirely
  if (!user || !pass) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Author Area"' },
    })
  }

  const auth = req.headers.get("authorization")
  if (!auth || !auth.startsWith("Basic ")) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Author Area"' },
    })
  }

  try {
    const decoded = Buffer.from(auth.split(" ")[1], "base64").toString()
    const [u, p] = decoded.split(":")
    if (u === user && p === pass) {
      return NextResponse.next()
    }
  } catch {
    // fallthrough to unauthorized
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Author Area"' },
  })
}

export const config = {
  matcher: ["/articles/new/:path*", "/articles/new"],
}
