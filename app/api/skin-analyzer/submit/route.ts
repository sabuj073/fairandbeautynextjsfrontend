import { API_BASE_URL } from "@/app/config/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_BASE_URL}/skin-analyzer/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.ok ? 200 : res.status });
  } catch (error: unknown) {
    console.error("Skin analyzer submit failed:", error);
    return NextResponse.json(
      { message: "Network error. Please try again." },
      { status: 502 }
    );
  }
}
