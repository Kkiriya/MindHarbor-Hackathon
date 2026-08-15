export interface JournalEntryData {
    generalMood: number;
    energyLevel: number;
    sleepQuality: number;
    stressLevel: number;
    keyEvents: string;
    dailyGratitude: string;
}

export interface Activity {
    activityId: string;
    name: string;
    desc: string;
}
