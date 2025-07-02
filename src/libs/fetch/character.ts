import toast from "react-hot-toast";
import prisma from "../db";
import { getAuthSession } from "../oAuth";

export async function characterDetails() {
  try {
    const session = await getAuthSession();
    const character = await prisma.character.findUnique({
      where: {
        id: session?.user.characterId,
      },
      include: {
        level: true,
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
    const badges = await prisma.badgeCharacter.findMany({
      where: {
        chracterId: session?.user.characterId,
        character: {
          userId: session?.user.id,
        },
      },
      include: {
        character: true,
      },
    });

    return badges;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching badge data");
  }
}
