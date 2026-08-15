import { create } from "node:domain";
import { z } from "zod/v3";

export const journalDateScheam = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La date doit être au format YYYY-MM-DD."),
});

export const createJournalSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La date doit être au format YYYY-MM-DD."),

  generalMood: z.number().int().min(1).max(5),

  energyLevel: z.number().int().min(1).max(5),

  sleepQuality: z.number().int().min(1).max(5),

  stressLevel: z.number().int().min(1).max(5),

  activityIds: z.array(z.string().uuid()).default([]),

  keyEvents: z.string().trim().min(1, "Les événements marquants sont requis."),

  dailyGratitude: z.string().trim().optional(),
});

export const updateJournalSchema = createJournalSchema.omit({
  date: true,
});

export const journalQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(20),

  sort: z
    .enum(["date_asc", "date_desc", "mood_asc", "mood_desc"])
    .default("date_asc"),

  minMood: z.coerce.number().int().min(1).max(5).optional(),

  maxMood: z.coerce.number().int().min(1).max(5).optional(),

  range: z.enum(["7d", "30d", "90d"]).default("30d"),
});

export const statsQuerySchema = z.object({
  range: z.enum(["7d", "30d", "90d"]).default("30d"),
});

export type CreateJournalInput = z.infer<typeof createJournalSchema>;
export type UpdateJournalInput = z.infer<typeof updateJournalSchema>;
export type JournalQuery = z.infer<typeof journalQuerySchema>;
export type StatsQuery = z.infer<typeof statsQuerySchema>;
