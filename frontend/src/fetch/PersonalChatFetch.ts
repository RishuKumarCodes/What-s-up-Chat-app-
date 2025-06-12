import { ALL_USERS } from "@/lib/apiAuthRoutes";

async function FetchAllUsers() {
  const res = await fetch(`${ALL_USERS}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    console.log(response.data)
    return response?.data;
  }
  return [];
}

export default FetchAllUsers;
