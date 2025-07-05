export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: UserRole;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
  characterId?: string;
}

export interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  characterId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordCredentials {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export enum UserRole {
  User = "User",
  Admin = "Admin",
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  character?: {
    id: string;
    name: string;
    symbol: string;
    gender: string;
    level?: {
      currentLevel: number;
      currentXP: number;
      requiredXP: number;
      xpToNextLevel: number;
      percentageToNextLevel: number;
    };
  };
  healthAnalysis?: {
    id: string;
    healthScore?: {
      score: number;
      interpretation?: {
        rating: number;
        message: string;
      };
    };
  };
  streaks?: {
    currentStreak: number;
    longestStreak: number;
    lastCheckIn: Date | null;
  };
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

export interface UsersListResponse {
  users: UserProfile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
}
