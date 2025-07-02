import prisma from "@/src/libs/db";
import { ApiResponse } from "@/src/utils/apiResponse";
import { errorHandler } from "@/middleware";
import { ApiError } from "next/dist/server/api-utils";
import { getAuthSession } from "@/src/libs/oAuth";

const streakDays = [
  { day: 1, reward: "🙂" },
  { day: 2, reward: "😊" },
  { day: 3, reward: "😃" },
  { day: 4, reward: "😁" },
  { day: 5, reward: "😍" },
];

export async function POST() {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return ApiResponse.error("Unauthorized", 401);
    }

    // Create default 5-day target
    await prisma.targetDay.createMany({
      data: streakDays.map((day) => ({
        userId: session.user.id,
        dayNumber: day.day,
        reward: day.reward,
      })),
    });

    return ApiResponse.success({
      message: "Target days created successfully",
    });
  } catch (error) {
    console.error("Detailed error in POST /api/checkin/record:", {
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
