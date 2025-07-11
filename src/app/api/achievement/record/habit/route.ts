import { errorHandler } from "../../../../../../middleware";
import prisma from "@/libs/db";
import { getAuthSession } from "@/libs/oAuth";
import { ApiResponse } from "@/utils/apiResponse";
import { ApiError } from "next/dist/server/api-utils";

export async function PUT() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }
    const getAllAchievements = await prisma.achievement.findMany();

    const achivementHabit = getAllAchievements.filter(
      (achievement) => achievement.category === "HABIT"
    );
    await achivementHabit.map(async (achievement) => {
      const achievementsToUpdate = await prisma.userAchievement.findMany({
        where: {
          userId: session.user.id,
          achievementId: achievement.id,
          isDone: false,
        },
      });
      // Then, update them with the correct isDone status
      await achievementsToUpdate.map(async (userAchievement) => {
        await prisma.userAchievement.update({
          where: {
            id: userAchievement.id,
          },
          data: {
            currentProgress: {
              increment: 1,
            },
            isDone:
              achievement.requirement <= userAchievement.currentProgress + 1,
            percentageProgress:
              achievement.requirement <= userAchievement.currentProgress + 1
                ? 100
                : ((userAchievement.currentProgress + 1) /
                    achievement.requirement) *
                  100,
          },
        });
      });
    });
    return ApiResponse.success(
      { message: "Achievement updated successfully" },
      200
    );
  } catch (error) {
    console.error("Detailed error in PUT /api/achievement/record/habit", {
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
