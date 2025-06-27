import { PRIVATE_CHATS } from "@/lib/apiAuthRoutes";

export async function PersonalChatHistory(me: number, other: number) {
  const res = await fetch(`${PRIVATE_CHATS}?user1=${me}&user2=${other}`);

  if (!res.ok) throw new Error("failed to fetch personal-chat history");
  const response = await res.json();
  if (response?.data) return response?.data;
  return [];
}
