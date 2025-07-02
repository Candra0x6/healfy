import prisma from "@/src/libs/db";
import { getAuthSession } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";

export async function GET() {
  const session = await getAuthSession();

  if (!session) {
    return ApiResponse.error("Unauthorized", 401);
  }

  const achievements = await prisma.userAchievement.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      achievement: true,
    },
  });

  return ApiResponse.success(
    {
      message: "Achivements data retrieved successfully",
      data: achievements,
    },
    200
  );
}
