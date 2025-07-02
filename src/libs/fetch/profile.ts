import prisma from "../db";

export async function detailPlayer({ userId }: { userId: string }) {
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        UserAchievement: {
          where: {
            isClaimed: true,
          },
          include: {
            achievement: true,
          },
        },
        healthAnalysis: {
          select: {
            lifestyleModifications: {
              where: {
                mission: {
                  every: {
                    isClaimed: true,
                  },
                },
              },
              include: {
                mission: true,
              },
            },
          },
        },
        Character: {
          include: {
            level: true,
          },
        },
      },
    });

    return userDetails;
  } catch (error) {
    console.error(error);
  }
}

export async function leaderboardDetails() {
  try {
    const leaderboard = await prisma.user.findMany({
      orderBy: {
        Character: {
          level: {
            currentXP: "desc",
          },
        },
      },
      include: {
        Character: {
          include: {
            level: true,
          },
        },
      },
    });

    return leaderboard;
  } catch (error) {
    console.error(error);
  }
}
