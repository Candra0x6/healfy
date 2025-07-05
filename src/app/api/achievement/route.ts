import prisma from "@/libs/db";
import { getAuthSession } from "@/libs/oAuth";
import { ApiResponse } from "@/utils/apiResponse";

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
