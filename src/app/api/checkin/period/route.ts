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

    const checkInPeriod = await prisma.checkInPeriod.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return ApiResponse.success(
      {
        message: "checkin period retrieved successfully",
        data: checkInPeriod,
      },
      200
    );
  } catch (error) {
    console.error("Detailed error in GET /api/checkin/period", {
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
