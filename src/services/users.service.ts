import { User } from "../context/planner/planner.types";
import { apiGet } from "./apiClient";

const BASE = "/api/users";

export async function fetchUsers(): Promise<User[]> {
  return apiGet<User[]>(BASE);
}
