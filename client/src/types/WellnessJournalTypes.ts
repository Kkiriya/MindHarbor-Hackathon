export interface JournalEntry {
    generalMood: number;
    energyLevel: number;
    sleepQuality: number;
    stressLevel: number;
    keyEvents: string;
    dailyGratitude: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Activity {
    activityId: string;
    name: string;
    desc: string;
}

export interface ActivitiesProps {
    activities: Activity[];
    selectedActivitiesId: string[];
    onChange: (activityName: string, checked: boolean) => void;
}