import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { getAuthSession } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user.id) {
      return ApiResponse.error("Unauthorized", 401);
    }
    const lifestyle = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      include: {
        healthAnalysis: {
          include: {
            lifestyleModifications: {
              include: {
                implementationPlan: true,
              },
            },
          },
        },
        medicalData: true,
      },
    });

    return ApiResponse.success(
      lifestyle?.healthAnalysis?.lifestyleModifications,
      200
    );
  } catch (error) {
    return errorHandler(error as ApiError);
  }
}
