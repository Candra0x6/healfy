import { errorHandler } from "@/middleware";
import prisma from "@/src/libs/db";
import { authOptions } from "@/src/libs/oAuth";
import { ApiResponse } from "@/src/utils/apiResponse";
import { randomInt } from "crypto";
import { getServerSession } from "next-auth";
import { ApiError } from "next/dist/server/api-utils";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session?.user.id) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const habits = await prisma.user.findUnique({
      where: {
        id: session.user.id,
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
      },
    });

    const character = await prisma.character.findUnique({
      where: {
        // change to character id
        id: session.user.characterId,
      },
    });
    habits?.healthAnalysis?.lifestyleModifications.map(async (habit) => {
      {
        await prisma.mission.create({
          data: {
            title: habit.activity,
            description: habit.targetConditions
              .map((condition) => condition)
              .join(", "),
            xpReward: randomInt(40, 200),
            requiredCount: 1,
            currentCount: 0,
            habit: { connect: { id: habit.id } },
            character: { connect: { id: character?.id } },
          },
        });
      }
    });
    // Create new mission
    return ApiResponse.success("Mission created", 200);
  } catch (error) {
    return errorHandler(error as ApiError);
  }
}
