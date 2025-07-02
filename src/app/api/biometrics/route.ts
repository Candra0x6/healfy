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
    const biometrics = await prisma.medicalData.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        biometrics: true,
        lifestyle: true,
        conditions: true,
      },
    });
    return ApiResponse.success(
      {
        message: "Biometrics retrieved successfully",
        data: biometrics,
      },
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
