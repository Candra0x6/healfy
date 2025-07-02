import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { ApiResponse } from "@/src/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: { userId: string } = await request.json();
    console.log(body);
    if (!body.userId) {
      return ApiResponse.error({ message: "Unauthorized" }, 401);
    }
    const characterExists = await prisma.character.findFirst({
      where: {
        userId: body.userId,
      },
    });

    if (characterExists) {
      return ApiResponse.error(
        {
          message: "Character already exists",
          character: characterExists,
        },
        400
      );
    }

    const randomName = Math.random().toString(36).substring(7);

    const character = await prisma.character.create({
      data: {
        name: randomName,
        symbol: "👤",
        userId: body.userId,
        level: {
          create: {
            currentLevel: 1,
            currentXP: 0,
            xpToNextLevel: 210,
            percentageToNextLevel: 0,
            requiredXP: 210,
          },
        },
        badges: {
          create: {
            name: "Newbie",
            symbol: "🆕",
          },
        },
      },
    });

    return ApiResponse.success(character, 201);
  } catch (error) {
    return errorHandler(error as ApiError);
  }
}
