import type { RequestHandler } from "express";
import type { ZodSchema } from "zod/v3";
import { AppError } from "./error.js";

export const validateBody =
  (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const details = result.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));
      return next(
        new AppError(422, "VALIDATION_ERROR", "Donnees invalides", details),
      );
    }
    req.body = result.data; // req.body est desormais valide et nottoye
    next();
  };

export const validateQuery =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const details = result.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));

      return next(
        new AppError(422, "VALIDATION_ERROR", "Donnees invalides", details),
      );
    }
    // Express 5 exposes req.query through a getter, so it cannot be assigned
    // directly. Define the validated query on this request instead.
    Object.defineProperty(req, "query", {
      value: result.data,
      writable: true,
      configurable: true,
      enumerable: true,
    });
    next();
  };

export const validateParams =
  (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const details = result.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));
      return next(
        new AppError(422, "VALIDATION_ERROR", "Donnees invalides", details),
      );
    }
    req.params = result.data;
    next();
  };
