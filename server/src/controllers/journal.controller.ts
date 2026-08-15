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
import { parse } from "node:path";

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

// GET /journal
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

// POST /journal
export const createJournalEntry: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(
        new AppError(401, "UNAUTHENTICATED", "Authentification requise."),
      );
    }
    const data = req.body as CreateJournalInput;
    const date = parseDate(data.date);

    if (!isToday(date)) {
      return next(
        new AppError(
          400,
          "INVALID_JOURNAL_DATE",
          "Une entrée de journal doit correspondre à la journée actuelle.",
        ),
      );
    }

    const existing = await prisma.journalEntry.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
    });

    if (existing) {
      return next(
        new AppError(
          409,
          "JOURNAL_ALREADY_EXISTS",
          "Une entrée existe déjà pour cette journée.",
        ),
      );
    }

    const journal = await prisma.journalEntry.create({
      data: {
        userId,
        date,
        generalMood: data.generalMood,
        energyLevel: data.energyLevel,
        sleepQuality: data.sleepQuality,
        stressLevel: data.stressLevel,
        keyEvents: data.keyEvents,
        dailyGratitude: data.dailyGratitude ?? null,

        journalActivities: {
          create: data.activityIds.map((activityId) => ({
            activity: {
              connect: {
                activityId,
              },
            },
          })),
        },
      },

      include: {
        journalActivities: {
          include: {
            activity: true,
          },
        },
      },
    });

    return res.status(201).json({
      data: journal,
    });
  } catch (error) {
    return next(error);
  }
};

// GET /journal/:date
export const getJournalEntry: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(
        new AppError(401, "UNAUTHENTICATED", "Authentification requise."),
      );
    }

    const dateParam = req.params.date;

    if (typeof dateParam !== "string") {
      throw new AppError(400, "INVALID_DATE_PARAMS", "Invalid date parameter");
    }

    if (!dateParam) {
      return next(new AppError(400, "INVALID_DATE", "Date invalide."));
    }

    const date = parseDate(dateParam);
    const journal = await prisma.journalEntry.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },

      include: {
        journalActivities: {
          include: {
            activity: true,
          },
        },
      },
    });

    if (!journal) {
      return next(
        new AppError(
          404,
          "JOURNAL_NOT_FOUND",
          "Aucune entrée trouvée pour cette date.",
        ),
      );
    }
    return res.status(200).json({
      data: journal,
    });
  } catch (error) {
    return next(error);
  }
};

// PATCH /journal/:date
export const updateJournalEntry: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(
        new AppError(401, "UNAUTHENTICATED", "Authentification requise."),
      );
    }
    const dateParam = req.params.date;

    if (typeof dateParam !== "string") {
      throw new AppError(400, "INVALID_DATE_PARAMS", "Invalid date parameter");
    }

    if (!dateParam) {
      return next(new AppError(400, "INVALID_DATE", "Date invalide."));
    }

    const date = parseDate(dateParam);
    const journal = await prisma.journalEntry.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
    });
    if (!journal) {
      return next(
        new AppError(
          403,
          "JOURNAL_LOCKED",
          "Cette entrée ne peut plus être modifiée.",
        ),
      );
    }
    const data = req.body as UpdateJournalInput;
    const updated = await prisma.journalEntry.update({
      where: {
        journalId: journal.journalId,
      },

      data: {
        generalMood: data.generalMood,
        energyLevel: data.energyLevel,
        sleepQuality: data.sleepQuality,
        stressLevel: data.stressLevel,
        keyEvents: data.keyEvents,
        dailyGratitude: data.dailyGratitude ?? null,

        journalActivities: {
          deleteMany: {},

          create: data.activityIds.map((activityId) => ({
            activity: {
              connect: {
                activityId,
              },
            },
          })),
        },
      },

      include: {
        journalActivities: {
          include: {
            activity: true,
          },
        },
      },
    });
    return res.status(200).json({
      data: updated,
    });
  } catch (error) {
    return next(error);
  }
};

// GET /journal/stats?range=30
export const getJournalStats: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(
        new AppError(401, "UNAUTHENTICATED", "Authentification requise."),
      );
    }
    const { range } = req.query as unknown as StatsQuery;
    const startDate = getRangeStart(range);
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: "asc",
      },
      select: {
        date: true,
        generalMood: true,
        energyLevel: true,
        sleepQuality: true,
        stressLevel: true,
      },
    });

    if (entries.length === 0) {
      return res.status(200).json({
        data: {
          range,
          entries: 0,
          averages: {
            mood: null,
            energy: null,
            sleepQuality: null,
            stress: null,
          },
          trends: [],
        },
      });
    }

    const average = (values: number[]): number => {
      return values.reduce((sum, value) => sum + value, 0) / values.length;
    };
    return res.status(200).json({
      data: {
        range,
        entries: entries.length,

        averages: {
          mood: average(entries.map((entry) => entry.generalMood)),
          energy: average(entries.map((entry) => entry.energyLevel)),
          sleepQuality: average(entries.map((entry) => entry.sleepQuality)),
          stress: average(entries.map((entry) => entry.stressLevel)),
        },
        trends: entries,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// GET /journal/insights
export const getJournalInsights: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(
        new AppError(401, "UNAUTHENTICATED", "Authentification requise."),
      );
    }
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
      take: 30,
      include: {
        journalActivities: {
          include: {
            activity: true,
          },
        },
      },
    });

    if (entries.length === 0) {
      return res.status(200).json({
        data: {
          message: "Pas assez de données pour générer des tendances.",
          insights: [],
        },
      });
    }
    const activityCounts = new Map<string, number>();

    for (const entry of entries) {
      for (const journalActivity of entry.journalActivities) {
        const name = journalActivity.activity.name;

        activityCounts.set(name, (activityCounts.get(name) ?? 0) + 1);
      }
    }
    const mostFrequentActivity = [...activityCounts.entries()].sort(
      (a, b) => b[1] - a[1],
    )[0];
    const averageStress =
      entries.reduce((sum, entry) => sum + entry.stressLevel, 0) /
      entries.length;
    const averageMood =
      entries.reduce((sum, entry) => sum + entry.generalMood, 0) /
      entries.length;

    const insights: string[] = [];

    if (averageStress >= 4) {
      insights.push("Votre niveau de stress moyen est relativement élevé.");
    }

    if (averageMood >= 4) {
      insights.push("Votre humeur moyenne est généralement positive.");
    }

    if (averageMood < 3) {
      insights.push("Votre humeur moyenne est plutôt basse sur cette période.");
    }

    if (mostFrequentActivity) {
      insights.push(
        `Votre activité la plus fréquente est « ${mostFrequentActivity[0]} ».`,
      );
    }
    return res.status(200).json({
      data: {
        period: "30d",
        entriesAnalyzed: entries.length,
        insights,
      },
    });
  } catch (error) {
    return next(error);
  }
};
