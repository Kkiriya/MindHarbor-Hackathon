import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import journalRoutes from "./routes/journal.route.js";

import { errorHandler } from "./middlewares/error.js";
import { stat } from "node:fs";

const app = express();

// === Glboal middlewares === //

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

// === Health check === //
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

// === API routes === //

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/journal", journalRoutes);

// === 404 Handler === //

app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route introuvable.",
    },
  });
});

// === Central error handler === //

app.use(errorHandler);

export default app;
