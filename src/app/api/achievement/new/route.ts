import prisma from "@/src/libs/db";
import { getAuthSession } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";

export async function POST() {
  const session = await getAuthSession();

  if (!session) {
    return ApiResponse.error("Unauthorized", 401);
  }

  const achievement = await prisma.achievement.findMany();
  const userAchivements = await prisma.userAchievement.createMany({
    data: achievement.map((achivement) => ({
      userId: session.user.id,
      achievementId: achivement.id,
      currentProgress: 0,
      isClaimed: false,
      isDone: false,
      percentageProgress: 0,
    })),
    skipDuplicates: true,
  });

  return ApiResponse.success(
    {
      message: "Character level retrieved successfully",
      data: userAchivements,
    },
    200
  );
}
