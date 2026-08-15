import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validate.js";
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
} from "../schema/journal.schema.js";

const router = Router();
router.use(requireAuth);

// /stats and /insights must come before /:date. Otherwise Express could interpret "stats" as a date.

router.get("/stats", getJournalStats);
router.get("/insights", getJournalInsights);
router.get("/", getJournalEntries);
router.post("/", validateBody(createJournalSchema), createJournalEntry);
router.get("/:date", getJournalEntry);
router.patch("/:date", validateBody(updateJournalSchema), updateJournalEntry);

export default router;
