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
    const body = await request.json();

    if (!body || !body.name || !body.gender) {
      return ApiResponse.error("Missing name in request body", 400);
    }

    const existingCharacter = await prisma.character.findUnique({
      where: {
        id: session.user.characterId,
      },
    });

    if (!existingCharacter) {
      return ApiResponse.error("Character not found", 404);
    }

    const character = await prisma.character.update({
      where: {
        id: session.user.characterId,
      },
      data: {
        name: body.name,
        gender: body.gender,
      },
    });

    return ApiResponse.success(
      { message: "Character name updated successfully", data: character },
      200
    );
  } catch (error) {
    console.error("Error in POST /api/character/change/name:", error);

    if (error instanceof Error) {
      return errorHandler(error as ApiError);
    }
    return ApiResponse.error("Internal Server Error", 500);
  }
}
