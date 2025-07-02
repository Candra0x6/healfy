import toast from "react-hot-toast";
import { getAuthSession } from "../oAuth";
import prisma from "../db";

export const detailMissions = async () => {
  try {
    const session = await getAuthSession();
    const missions = await prisma.mission.findMany({
      where: {
        characterId: session?.user.characterId,
      },
    });

    return missions;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching missions data");
  }
};

export const detailAchievements = async () => {
  try {
    const session = await getAuthSession();
    const achievements = await prisma.userAchievement.findMany({
      where: {
        userId: session?.user.id,
      },
      include: {
        achievement: true,
      },
    });

    return achievements;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching achievements data");
  }
};

export const detailCheckIn = async () => {
  try {
    const session = await getAuthSession();
    const targetDays = await prisma.targetDay.findMany({
      where: {
        userId: session?.user.id,
      },
    });

    return targetDays;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching check-in data");
  }
};
