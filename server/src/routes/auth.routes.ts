import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middlewares/error.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { error } from "node:console";

type RegisterBody = {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
};

type LoginBody = {
  email: string;
  password: string;
};

type RefreshBody = {
  refreshToken: string;
};

type AccessTokenPayload = {
  id: string;
  role: UserRole;
};

type RefreshTokenPayload = {
  id: string;
};

// function to fix the annoying typing strictness of ts
const getEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
};

const ACCESS_TOKEN_SECRET = getEnv("JWT_ACCESS_SECRET");
const REFRESH_TOKEN_SECRET = getEnv("JWT_REFRESH_SECRET");

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secrets are not configured.");
}

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

// Creates a short lived JWT access token
function createAccessToken(userId: string, role: UserRole): string {
  return jwt.sign(
    {
      id: userId,
      role,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );
}

// POST /auth/register
export const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, username, firstName, lastName } =
      req.body as RegisterBody;

    // Checks if the email already registered
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        userId: true,
      },
    });

    if (existingEmail) {
      return next(
        new AppError(
          409,
          "EMAIL_ALREADY_EXISTS",
          "Cette addresse courriel est déjà utilisée.",
        ),
      );
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return next(
        new AppError(
          409,
          "USERNAME_ALREADY_EXISTS",
          "Ce nom d'utilisateur est déjà utilisé.",
        ),
      );
    }

    // Hash password with 10 bcrypt rounds
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        role: UserRole.USER,
        username,
        firstName,
        lastName,
      },
      select: {
        userId: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        visibilityLevel: true,
        privateMessageLevel: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(201).json({
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};


