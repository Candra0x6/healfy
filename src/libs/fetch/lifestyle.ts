import toast from "react-hot-toast";
import prisma from "../db";
import { getAuthSession } from "../oAuth";

export default async function detailLifestyle() {
  try {
    const session = await getAuthSession();
    const habits = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
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
        medicalData: true,
      },
    });

    return habits?.healthAnalysis?.lifestyleModifications;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching lifestyle data");
  }
}
