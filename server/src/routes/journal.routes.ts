import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middlewares/validate.js";
import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntry,
  updateJournalEntry,
  getJournalStats,
  getJournalInsights,
} from "../controllers/journal.controller.js";
import {
  createJournalSchema,
  updateJournalSchema,
  journalDateSchema,
  journalQuerySchema,
  statsQuerySchema,
} from "../schema/journal.schema.js";

const router = Router();
router.use(requireAuth);

// /stats and /insights must come before /:date. Otherwise Express could interpret "stats" as a date.

router.get("/stats", validateQuery(statsQuerySchema), getJournalStats);
router.get("/insights", validateQuery(statsQuerySchema), getJournalInsights);
router.get("/", validateQuery(journalQuerySchema), getJournalEntries);
router.post("/", validateBody(createJournalSchema), createJournalEntry);
router.get("/:date", validateParams(journalDateSchema), getJournalEntry);
router.patch(
  "/:date",
  validateParams(journalDateSchema),
  validateBody(updateJournalSchema),
  updateJournalEntry,
);

export default router;
