import { NextResponse } from "next/server";
import { fetchChatGroups } from "@/fetch/groupFetch";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  try {
    const groups = await fetchChatGroups(token);
    return NextResponse.json(groups);
  } catch (err) {
    console.error("Failed to fetch groups:", err);
    return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 });
  }
}
