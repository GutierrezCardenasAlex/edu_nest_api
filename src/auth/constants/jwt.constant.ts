// src/auth/constants/jwt.constants.ts
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'fallback_secret_dev_only', // Solo para dev
};