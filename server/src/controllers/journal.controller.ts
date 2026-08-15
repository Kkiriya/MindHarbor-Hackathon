import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middlewares/error.js";
import type {
  CreateJournalInput,
  UpdateJournalInput,
  JournalQuery,
  StatsQuery,
} from "../schema/journal.schema.js";

function parseDate(date: string): Date {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    throw new AppError(400, "INVALID_DATE", "Date invalide.");
  }
  return parsed;
}

function isToday(date: Date): boolean {
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function isBeforeMidnight(): boolean {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  return now < tomorrow;
}
