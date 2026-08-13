import type { ErrorRequestHandler } from "express";

export type FieldError = { field: string; message: string };

export class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: FieldError[],
  ) {
    super(message);
  }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const isApp = err instanceof AppError;
  const status = isApp ? err.status : 500;
  if (status === 500) console.error(err);
  res.status(status).json({
    error: {
      code: isApp ? err.code : "INTERNAL_ERROR",
      message: status == 500 ? "Une erruer interne est survenue." : err.message,
      ...(isApp && err.details ? { details: err.details } : {}),
    },
  });
};
