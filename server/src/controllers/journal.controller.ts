import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middlewares/error.js";
import type {
  CreateJournalInput,
  UpdateJournalInput,
  JournalQuery,
  StatsQuery,
} from "../schema/journal.schema.js";
import { catchall } from "zod/mini";

function getRangeStart(range: "7d" | "30d" | "90d"): Date {
  const date = new Date();

  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - (days - 1));

  return date;
}

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

export const getJournalEntries: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(
        new AppError(401, "UNAUTHENTICATED", "Authentification requise."),
      );
    }

    const { page, limit, sort, minMood, maxMood, range } =
      req.query as unknown as JournalQuery;

    const skip = (page - 1) * limit;
    const where = {
      userId,

      ...(minMood !== undefined || maxMood !== undefined
        ? {
            generalMood: {
              ...(minMood !== undefined ? { gte: minMood } : {}),
              ...(maxMood !== undefined ? { lte: maxMood } : {}),
            },
          }
        : {}),

      ...(range
        ? {
            date: {
              gte: getRangeStart(range),
            },
          }
        : {}),
    };
    const orderBy =
      sort === "date_asc"
        ? { date: "asc" as const }
        : sort === "mood_asc"
          ? { generalMood: "asc" as const }
          : sort === "mood_desc"
            ? { generalMood: "desc" as const }
            : { date: "desc" as const };

    const [entries, total] = await prisma.$transaction([
      prisma.journalEntry.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          journalActivities: {
            include: {
              activity: true,
            },
          },
        },
      }),

      prisma.journalEntry.count({
        where,
      }),
    ]);

    return res.status(200).json({
      data: entries,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
};
