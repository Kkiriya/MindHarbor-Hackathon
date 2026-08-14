import type { log } from "node:console";
import { z } from "zod/v3";

export const registerSchema = z.object({
  email: z
    .string()
    .email("Format de courriel invalide")
    .transform((email) => email.toLowerCase().trim()),

  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .regex(/[A-Z]/, "Le mot de passe doit contenir une majuscule.")
    .regex(/[0-9]/, "Le mot de passe doit contenire un chiffre"),

  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères.")
    .max(30),

  firstName: z.string().min(1).max(100),

  lastName: z.string().min(1).max(100),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Format de courriel invalide")
    .transform((email) => email.toLowerCase().trim()),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Le jeton de rafraîchissement est requis."),
});

export const logoutSchema = z.object({
  refreshToken: z.string().min(1, "Le jeton de rafraîchissement est requis."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type LogoutInput = z.infer<typeof logoutSchema>;
