import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middlewares/error.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { tr } from "zod/locales";

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

// Creates a long lived JWT access token
function createRefreshToken(userId: string): string {
  return jwt.sign(
    {
      id: userId,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    },
  );
}

/**
 * POST /auth/register
 */

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

/**
 * POST /auth/login
 */

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as LoginBody;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        userId: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        password: true,
        visibilityLevel: true,
        privateMessageLevel: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Do not reveal wether email exist!
    if (!user) {
      return next(
        new AppError(
          401,
          "INVALID_CREDENTIALS",
          "Courriel ou mot de passe invalide.",
        ),
      );
    }
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return next(
        new AppError(
          401,
          "INVALID_CREDENTIALS",
          "Courriel ou mot de passe invalide.",
        ),
      );
    }
    const accessToken = createAccessToken(user.userId, user.role);
    const refreshToken = createRefreshToken(user.userId);

    // store bcrypt hash rather then the raw token
    const tokenHash = await bcrypt.hash(refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        userId: user.userId,
        tokenHash,
        expiresAt,
      },
    });

    // explicitely exlude password from respone
    const { password: _password, ...safeUser } = user;

    return res.status(200).json({
      data: {
        user: safeUser,
        accessToken: accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /auth/refresh
 */

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.body as RefreshBody;

    let payload: RefreshTokenPayload;

    try {
      payload = jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
      ) as RefreshTokenPayload;
    } catch {
      return next(
        new AppError(
          401,
          "INVALID_REFRESH_TOKEN",
          "Jeton de rafraîchissement invalide ou expiré.",
        ),
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        userId: payload.id,
      },
      select: {
        userId: true,
        role: true,
      },
    });
    if (!user) {
      return next(
        new AppError(
          401,
          "INVALID_REFRESH_TOKEN",
          "Jeton de rafraîchissement invalide.",
        ),
      );
    }

    // bcrypt hashes cannot be searched directly, so we retrieve the user's active refresh and compare the suppliesd token against each hash
    const storedTokens = await prisma.refreshToken.findMany({
      where: {
        userId: user.userId,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    let validToken = false;

    for (const storedToken of storedTokens) {
      if (await bcrypt.compare(refreshToken, storedToken.tokenHash)) {
        validToken = true;
        break;
      }
    }

    if (!validToken) {
      return next(
        new AppError(
          401,
          "INVALID_REFRESH_TOKEN",
          "Jeton de rafraîchissement invalide ou révoqué.",
        ),
      );
    }

    const accessToken = createAccessToken(user.userId, user.role);
    return res.status(200).json({
      data: {
        accessToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /auth/logout
 */

export const logout: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.body as RefreshBody;

    let payload: RefreshTokenPayload;

    try {
      payload = jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
      ) as RefreshTokenPayload;
    } catch {
      return next(
        new AppError(
          401,
          "INVALID_REFRESH_TOKEN",
          "Jeton de rafraîchissement invalide.",
        ),
      );
    }

    const storedTokens = await prisma.refreshToken.findMany({
      where: {
        userId: payload.id,
        revokedAt: null,
      },
    });

    for (const storedToken of storedTokens) {
      const matches = await bcrypt.compare(refreshToken, storedToken.tokenHash);

      if (matches) {
        await prisma.refreshToken.update({
          where: {
            refreshTokenId: storedToken.refreshTokenId,
          },
          data: {
            revokedAt: new Date(),
          },
        });
        return res.status(204).send();
      }
    }
    return next(
      new AppError(
        401,
        "INVALID_REFRESH_TOKEN",
        "Jeton de rafraîchissement invalide.",
      ),
    );
  } catch (error) {
    return next(error);
  }
};

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: {
        userId,
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

    if (!user) {
      return next(
        new AppError(404, "USER_NOT_FOUND", "Utilisateur introuvable."),
      );
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};
