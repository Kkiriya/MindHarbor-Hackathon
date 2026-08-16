import { Router } from "express";
import { getActivities } from "../controllers/activity.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/", getActivities);

export default router;
