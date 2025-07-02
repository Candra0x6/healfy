import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { ApiResponse } from "@/src/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body) {
      return ApiResponse.error("No request body received", 400);
    }

    if (!body.id) {
      return ApiResponse.error("Missing habitId in request body", 400);
    }

    const result = await prisma.lifestyleModification.update({
      where: {
        id: body.id,
      },
      data: {
        isActive: false,
      },
    });

    if (!result) {
      console.error("No mission found or updated");
      return ApiResponse.error("No mission found or updated", 404);
    }

    return ApiResponse.success(
      {
        message: "Mission updated successfully",
        data: result,
      },
      200
    );
  } catch (error) {
    console.error("Detailed error in PUT /api/mission/record:", {
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
