import type { RequestHandler } from "express";
import type { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { AppError } from "./error.js";

type AccessPayload = { id: string; role: Role };

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer") ? header.slice(7) : null;
  try {
    req.user = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!,
    ) as AccessPayload;
    next();
  } catch {
    next(new AppError(401, "INVALID_TOKEN", "Token invalide ou expire."));
  }
};

export const requireRole =
  (...roles: Role[]): RequestHandler =>
  (req, _res, next) =>
  (req, _res, next) =>
    req.user && roles.includes(req.user.role)
      ? next()
      : next(new AppError(403, "FORBIDDEN", "Access refuse."));
