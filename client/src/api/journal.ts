import { api } from "./axios";
import type {
  JournalEntry,
  JournalEntryData,
  Paginated,
} from "../types/WellnessJournalTypes";
import type { AnalysisRange, AnalysisStats } from "../types/AnalysisTypes";

type ApiData<T> = { data: T };

type JournalQuery = {
  page?: number;
  limit?: number;
  range?: AnalysisRange;
};

type InsightsData = {
  period: AnalysisRange | "30d";
  entriesAnalyzed: number;
  insights: string[];
};

export async function getJournalEntries(query: JournalQuery = {}): Promise<Paginated<JournalEntry>> {
  const response = await api.get<Paginated<JournalEntry>>("/journal", { params: query });
  return response.data;
}

export async function getJournalEntry(date: string): Promise<JournalEntry> {
  const response = await api.get<ApiData<JournalEntry>>(`/journal/${date}`);
  return response.data.data;
}

export async function createJournalEntry(
  date: string,
  payload: JournalEntryData,
  activityIds: string[],
): Promise<JournalEntry> {
  const response = await api.post<ApiData<JournalEntry>>("/journal", {
    date,
    ...payload,
    activityIds,
  });
  return response.data.data;
}

export async function getJournalStats(range: AnalysisRange): Promise<AnalysisStats> {
  const response = await api.get<ApiData<AnalysisStats>>("/journal/stats", { params: { range } });
  return response.data.data;
}

export async function getJournalInsights(range?: AnalysisRange): Promise<string[]> {
  const response = await api.get<ApiData<InsightsData>>("/journal/insights", {
    params: range ? { range } : undefined,
  });
  return response.data.data.insights;
}