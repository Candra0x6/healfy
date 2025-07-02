import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { getAuthSession } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }
    const body: { name: string; reward: string } = await request.json();

    if (!body || !body.name || !body.reward) {
      return ApiResponse.error("Missing name or reward in request body", 400);
    }
    console.log(body);

    const characterBadge = await prisma.badgeCharacter.create({
      data: {
        name: body.name,
        symbol: body.reward,
        chracterId: session.user.characterId,
      },
    });

    return ApiResponse.success(
      {
        message: "Badge created successfully",
        data: characterBadge,
      },
      201
    );
  } catch (error) {
    console.error("Detailed error in POST /api/character/badge/new", {
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
