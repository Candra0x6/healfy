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

    const targetDays = await prisma.targetDay.findMany({
      where: {
        userId: session.user.id,
      },
      include: {},
    });

    return ApiResponse.success(
      {
        message: "target days retrieved successfully",
        data: targetDays,
      },
      200
    );
  } catch (error) {
    console.error("Detailed error in GET /api/checkin", {
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
