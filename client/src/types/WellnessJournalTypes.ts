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

/**
 * Props for the GeneralWellness component that the function must receive.
 * @property data The current wellness data.
 * @property onChange A callback function to handle changes to the wellness data.
 */
export interface GeneralWellnessProps {
    data: JournalEntry;
    // keyof confirms that the field is one of the keys of the WellnessData type, and value is a number.
    onChange: (field: keyof JournalEntry, value: number) => void;
}