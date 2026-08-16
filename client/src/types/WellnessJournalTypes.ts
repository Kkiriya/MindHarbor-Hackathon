export interface JournalEntryData {
    generalMood: number;
    energyLevel: number;
    sleepQuality: number;
    stressLevel: number;
    keyEvents: string;
    dailyGratitude: string;
}

export interface JournalEntry {
    journalId: string;
    date: string;
    generalMood: number;
    energyLevel: number;
    sleepQuality: number;
    stressLevel: number;
    keyEvents: string;
    dailyGratitude: string | null;
}

export interface Activity {
    activityId: string;
    name: string;
    desc: string | null;
}

export interface Paginated<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
