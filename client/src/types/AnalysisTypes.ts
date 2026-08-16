export type AnalysisRange = "7d" | "30d" | "90d";

export type Indicator =
    | "generalMood"
    | "energyLevel"
    | "sleepQuality"
    | "stressLevel";

export interface TrendEntry {
    date: string;
    generalMood: number;
    energyLevel: number;
    sleepQuality: number;
    stressLevel: number;
}

export interface AnalysisStats {
    entries: number;
    averages: {
        mood: number | null;
        energy: number | null;
        sleepQuality: number | null;
        stress: number | null;
    };
    trends: TrendEntry[];
}
