import { NextResponse } from "next/server";
import FetchAllUsers from "@/fetch/PersonalChatFetch";

export async function GET() {
  try {
    const users = await FetchAllUsers();
    return NextResponse.json({ data: users });
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
