import prisma from "@/src/libs/db";
import { getAuthSession } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";

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
