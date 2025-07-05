import { errorHandler } from "../../../../../middleware";
import prisma from "@/libs/db";
import { getAuthSession } from "@/libs/oAuth";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return ApiResponse.error({ message: "Unauthorized" }, 401);
    }
    const body: { achivementId: string } = await request.json();
    if (!session?.user.id) {
      return ApiResponse.error({ message: "Unauthorized" }, 401);
    }

    if (!body.achivementId) {
      return ApiResponse.error(
        { message: "Missing achivementId in request body" },
        400
      );
    }

   const achievement = await prisma.userAchievement.findFirst({
  where: {
    id: body.achivementId,
    isClaimed: false,
  },
});

if (!achievement) {
  throw new Error("Achievement not found or already claimed.");
}

const userAchievement = await prisma.userAchievement.update({
  where: { id: achievement.id, isClaimed: false }, 
  data: {
    isClaimed: true,
  },
});
    return ApiResponse.success(
      {
        message: "Achievement claimed successfully",
        data: userAchievement,
      },
      201
    );
  } catch (error) {
    console.error("Detailed error in POST /api/achievement/claim", {
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
