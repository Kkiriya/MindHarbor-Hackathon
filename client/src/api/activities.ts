import { api } from "./axios";
import type { Activity } from "../types/WellnessJournalTypes";

type ApiData<T> = { data: T };

export async function getActivities(): Promise<Activity[]> {
  const response = await api.get<ApiData<Activity[]>>("/activities");
  return response.data.data;
}
