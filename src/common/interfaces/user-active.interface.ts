// src/common/interfaces/user-active.interface.ts
export interface UserActiveInterface {
  userId: string;     // ← string si usas UUID
  // userId: number;  // ← number si usas autoincrement
  username: string;
  email: string;
  role: string;
}