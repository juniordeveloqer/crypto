import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";

const protectedRoutes = ["/dashboard", "/profile"];


export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const sessionCookie = req.cookies.get("token")?.value;
  
  // Kullanıcı oturum açmamışsa ve korunan bir sayfaya erişmeye çalışıyorsa, /login sayfasına yönlendir
  if (!sessionCookie && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  
  // Kullanıcı oturum açmışsa ve /login veya /signup sayfalarına erişmeye çalışıyorsa, ana sayfaya yönlendir
  if (sessionCookie) {
    const session = await verifySession(sessionCookie);

    if (session?._id && (path === "/login" || path === "/signup")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
