import prisma from "@/libs/db";
import { getAuthSession } from "@/libs/oAuth";
import { ApiResponse } from "@/utils/apiResponse";

export async function GET() {
  const session = await getAuthSession();

  if (!session) {
    return ApiResponse.error("Unauthorized", 401);
  }

  const character = await prisma.character.findUnique({
    where: {
      id: session.user.characterId,
    },
    include: {
      level: true,
    },
  });

  return ApiResponse.success(
    {
      message: "Character level retrieved successfully",
      data: character,
    },
    200
  );
}
