import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { getAuthSession } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const missions = await prisma.mission.findMany({
      where: {
        characterId: session.user.characterId,
      },
    });

    return ApiResponse.success(
      {
        message: "Missions retrieved successfully",
        data: missions,
      },
      200
    );
  } catch (error) {
    console.error("Error in GET /api/mission:", error);

    if (error instanceof Error) {
      return errorHandler(error as ApiError);
    }

    return ApiResponse.error("Internal Server Error", 500);
  }
}
