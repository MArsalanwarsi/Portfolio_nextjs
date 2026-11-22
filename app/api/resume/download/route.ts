import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Access passphrase is required." },
        { status: 400 }
      );
    }

    const expectedPassword = process.env.RESUME_PASSWORD || "135790";

    const inputBuf = Buffer.from(password.trim());
    const expectedBuf = Buffer.from(expectedPassword.trim());

    const isMatch =
      inputBuf.length === expectedBuf.length &&
      crypto.timingSafeEqual(inputBuf, expectedBuf);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid access passphrase. Access denied." },
        { status: 401 }
      );
    }

    // Read the resume file securely from server filesystem
    const filePath = path.join(process.cwd(), "public", "M_Arsalan_Warsi_CV.pdf");
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="M_Arsalan_Warsi_CV.pdf"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Resume download error:", error);
    return NextResponse.json(
      { error: "Internal server error during credential verification." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Passphrase authentication required via POST." },
    { status: 405 }
  );
}
