import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { getAuthSession } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId;
  try {
    const session = await getAuthSession();
    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        UserAchievement: {
          where: {
            isClaimed: true,
          },
          include: {
            achievement: true,
          },
        },
        healthAnalysis: {
          select: {
            lifestyleModifications: {
              where: {
                mission: {
                  every: {
                    isClaimed: true,
                  },
                },
              },
              include: {
                mission: true,
              },
            },
          },
        },
        Character: {
          include: {
            level: true,
          },
        },
      },
    });

    return ApiResponse.success(
      {
        message: "user detail retrieved successfully",
        data: userDetails,
      },
      200
    );
  } catch (error) {
    console.error("Detailed error in GET /api/user/userId:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof Error) {
      return errorHandler(error as ApiError);
    }

    return ApiResponse.error("Internal Server Error", 500);
  }
}
