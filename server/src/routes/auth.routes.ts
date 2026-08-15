import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate.js";
import {
  registerSchema,
  loginSchema,
  refreshSchema,
} from "../schema/auth.schema.js";

const router = Router();

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

router.post("/register", authRateLimit, validateBody(registerSchema), register);

router.post("/login", authRateLimit, validateBody(loginSchema), login);

router.post("/refresh", validateBody(refreshSchema), refresh);

router.post("/logout", validateBody(refreshSchema), logout);

export default router;
