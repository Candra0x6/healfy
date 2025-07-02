import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { ApiResponse } from "@/src/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || !body.habitId) {
      return ApiResponse.error("Missing habitId in request body", 400);
    }

    const result = await prisma.mission.updateMany({
      where: {
        habitId: body.habitId,
      },
      data: {
        isDone: true,
        currentCount: +1,
      },
    });

    if (!result) {
      return ApiResponse.error("Failed to update mission", 404);
    }

    return ApiResponse.success(
      { message: "Mission updated successfully", data: result },
      200
    );
  } catch (error) {
    console.error("Error in PUT /api/mission/record:", error);

    if (error instanceof Error) {
      return errorHandler(error as ApiError);
    }

    return ApiResponse.error("Internal Server Error", 500);
  }
}
