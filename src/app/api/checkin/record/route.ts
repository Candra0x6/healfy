import { NextResponse } from "next/server";
import prisma from "@/src/libs/db";
import { ApiResponse } from "@/src/utils/apiResponse";
import { errorHandler } from "@/middleware";
import { ApiError } from "next/dist/server/api-utils";
import { isNewPeriodNeeded } from "@/src/utils/isPerioedNeeded";
import { getAuthSession } from "@/src/libs/oAuth";

export async function POST() {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        currentPeriod: true,
        targetDays: true,
        Character: true,
      },
    });

    if (!user) {
      return ApiResponse.error("User Not Found", 404);
    }

    // Start transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Initialize or update check-in period
      let currentPeriod = user.currentPeriod;
      if (!currentPeriod || isNewPeriodNeeded(currentPeriod.startDate)) {
        currentPeriod = await tx.checkInPeriod.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            startDate: today,
            currentDay: 1,
            completedDays: 0,
          },
          update: {
            startDate: today,
            currentDay: 1,
            completedDays: 0,
          },
        });
      }

      // Validate if today is a target day
      const targetDay = user.targetDays.find(
        (t) => t.dayNumber === currentPeriod.currentDay
      );
      if (!targetDay) {
        return NextResponse.json(
          { error: "Today is not a target check-in day" },
          { status: 400 }
        );
      }

      // Create check-in
      const checkIn = await tx.checkIn.create({
        data: {
          userId: user.id,
          dayNumber: currentPeriod.currentDay,
          reward: targetDay.reward,
          title: "Check-in",
          date: today,
        },
      });

      // Update period progress
      await tx.checkInPeriod.update({
        where: { id: currentPeriod.id },
        data: {
          currentDay: currentPeriod.currentDay + 1,
          completedDays: currentPeriod.completedDays + 1,
        },
      });

      await tx.targetDay.update({
        where: {
          id: targetDay.id,
        },
        data: {
          isCompleted: true,
        },
      });

      await tx.badgeCharacter.create({
        data: {
          name: "Check-in",
          symbol: targetDay.reward,
          chracterId: user.Character?.id,
        },
      });

      return checkIn;
    });

    return ApiResponse.success(
      {
        message: "Check-in successfully",
        data: result,
      },
      201
    );
  } catch (error) {
    console.error("Detailed error in POST /api/character/badge/new", {
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
