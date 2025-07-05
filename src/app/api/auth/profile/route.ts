import { errorHandler } from "../../../../../middleware";
import prisma from "@/libs/db";
import { ApiResponse } from "@/utils/apiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/oAuth";
import { ApiError } from "next/dist/server/api-utils";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        Character: {
          select: {
            id: true,
            name: true,
            symbol: true,
            gender: true,
            level: {
              select: {
                currentLevel: true,
                currentXP: true,
                requiredXP: true,
                xpToNextLevel: true,
                percentageToNextLevel: true,
              },
            },
          },
        },
        healthAnalysis: {
          select: {
            id: true,
            healthScore: {
              select: {
                score: true,
                interpretation: {
                  select: {
                    rating: true,
                    message: true,
                  },
                },
              },
            },
          },
        },
        streaks: {
          select: {
            currentStreak: true,
            longestStreak: true,
            lastCheckIn: true,
          },
        },
      },
    });

    if (!user) {
      return ApiResponse.error("User not found", 404);
    }

    return ApiResponse.success(user, 200);
  } catch (error) {
    console.error("Get profile error:", error);
    return errorHandler(error as ApiError);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const body = await request.json();
    const { name, email } = body;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: session.user.id },
        },
      });

      if (existingUser) {
        return ApiResponse.error("Email is already taken", 400);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        updatedAt: true,
      },
    });

    return ApiResponse.success(
      {
        user: updatedUser,
        message: "Profile updated successfully",
      },
      200
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return errorHandler(error as ApiError);
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return ApiResponse.error("Unauthorized", 401);
    }

    // Soft delete user
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        deletedAt: new Date(),
        email: `deleted_${Date.now()}_${session.user.email}`, // Prevent email conflicts
      },
    });

    return ApiResponse.success(
      { message: "Account deleted successfully" },
      200
    );
  } catch (error) {
    console.error("Delete account error:", error);
    return errorHandler(error as ApiError);
  }
}
