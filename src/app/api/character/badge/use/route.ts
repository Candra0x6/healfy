import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { getAuthSession } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }
    const body: { name: string; reward: string } = await request.json();

    if (!body || !body.name || !body.reward) {
      return ApiResponse.error("Missing name or reward in request body", 400);
    }

    const characterBadge = await prisma.character.update({
      where: {
        id: session.user.characterId,
      },
      data: {
        symbol: body.reward,
      },
    });

    return ApiResponse.success(
      {
        message: "Badge used successfully",
        data: characterBadge,
      },
      201
    );
  } catch (error) {
    console.error("Detailed error in PUT /api/character/badge/use", {
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
