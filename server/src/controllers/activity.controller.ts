import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma.js";

// GET /activities
export const getActivities: RequestHandler = async (_req, res, next) => {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json({
      data: activities,
    });
  } catch (error) {
    return next(error);
  }
};
