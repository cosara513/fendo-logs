import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "fendo2026";
const COOKIE_NAME = "fendo-admin";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "密码错误" }, { status: 401 });
    }
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ success: false, error: "请求错误" }, { status: 400 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(COOKIE_NAME)?.value === "1";
  if (!isAdmin) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", { maxAge: 0 });
  return response;
}
