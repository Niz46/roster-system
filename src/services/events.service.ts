import { RosterEvent } from "../context/planner/planner.types";
import { apiGet, apiPost, apiPut, apiDelete } from "./apiClient";

const BASE = "/api/events";

export async function fetchEvents(): Promise<RosterEvent[]> {
  return apiGet<RosterEvent[]>(BASE);
}

export async function createEvent(payload: RosterEvent): Promise<RosterEvent> {
  return apiPost<RosterEvent, RosterEvent>(BASE, payload);
}

export async function updateEvent(payload: RosterEvent): Promise<RosterEvent> {
  return apiPut<RosterEvent, RosterEvent>(BASE, payload);
}

export async function removeEvent(id: string): Promise<{ id: string }> {
  return apiDelete<{ id: string }>(`${BASE}?id=${encodeURIComponent(id)}`);
}
