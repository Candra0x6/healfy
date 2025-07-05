import toast from "react-hot-toast";
import prisma from "../db";
import { getAuthSession } from "../oAuth";

export async function characterDetails() {
  try {
    const session = await getAuthSession();
    console.log(session)
    const character = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      include: {
        Character : {
          where: {
            userId : session?.user.id,
          },
          include: {
            level: true
          }
        }
      },

    });

    return character;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching character data");
  }
}

export async function badgeDetails() {
  try {
    const session = await getAuthSession();
    const badges = await prisma.user.findUnique({
      where: {
        id : session?.user.id,

      },
      include: {
        Character: {
          where: {
            userId: session?.user.id,
          },
          include: {
            badges: true
          },
        },
      },
    });

    return badges;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching badge data");
  }
}
