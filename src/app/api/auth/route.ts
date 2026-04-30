import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

const COOKIE_NAME = "fendo-admin";

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === "1";
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("logs")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const logs = (data || []).map((row: any) => ({
    id: row.id,
    date: row.date,
    dayOfWeek: row.day_of_week,
    number: row.number,
    quote: row.quote,
    sections: row.sections,
    slogan: row.slogan,
    createdAt: row.created_at,
  }));

  return NextResponse.json({ logs });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "无权访问" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { data, error } = await supabaseAdmin.from("logs").upsert(
      {
        id: body.date,
        date: body.date,
        day_of_week: body.dayOfWeek,
        number: body.number,
        quote: body.quote,
        sections: body.sections,
        slogan: body.slogan || "全心奋进每一天",
        created_at: body.createdAt || Date.now(),
      },
      { onConflict: "id" }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, log: data });
  } catch (err) {
    return NextResponse.json(
      { error: "保存失败: " + (err instanceof Error ? err.message : String(err)) },
      { status: 500 }
    );
  }
}
