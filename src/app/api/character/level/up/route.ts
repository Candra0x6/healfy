import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { getAuthSession } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";
import { calculateLevelProgress } from "@/src/utils/calculateLevel";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }
    const body = await request.json();

    if (!body || !body.id || !body.xp) {
      return ApiResponse.error("Missing id or xp in request body", 400);
    }

    const existingCharacter = await prisma.character.findUnique({
      where: {
        id: session.user.characterId,
      },
      include: {
        level: true,
      },
    });

    if (!existingCharacter) {
      return ApiResponse.error("Character not found", 404);
    }

    const levelProgress = calculateLevelProgress(
      existingCharacter.level?.currentXP + body.xp
    );
    const character = await prisma.character.update({
      where: {
        id: session.user.characterId,
      },
      data: {
        level: {
          update: {
            currentXP: existingCharacter.level?.currentXP + body.xp,
            currentLevel: levelProgress.currentLevel,
            xpToNextLevel: levelProgress.xpToNextLevel,
            percentageToNextLevel: levelProgress.percentageToNextLevel,
            requiredXP: levelProgress.totalXPForNextLevel,
          },
        },
      },
    });

    return ApiResponse.success(
      {
        message: "Mission updated successfully",
        data: { character, levelProgress },
      },
      200
    );
  } catch (error) {
    console.error("Error in PUT /api/character/level/up:", error);

    if (error instanceof Error) {
      return errorHandler(error as ApiError);
    }
    return ApiResponse.error("Internal Server Error", 500);
  }
}
