import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalized = pathname.toLowerCase();

  // Intercept any direct GET access to the raw CV file
  if (normalized === "/m_arsalan_warsi_cv.pdf") {
    return new NextResponse(
      JSON.stringify({
        error: "Direct access restricted. Passphrase authentication required via secure terminal.",
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/M_Arsalan_Warsi_CV.pdf", "/m_arsalan_warsi_cv.pdf"],
};
