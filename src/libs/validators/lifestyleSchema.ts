import { z } from "zod";

export const lifestyleSchema = z.object({
  smokingHabit: z.enum(["NON_SMOKER", "FORMER_SMOKER", "ACTIVE_SMOKER"]),
  alcoholConsumption: z.enum(["NEVER", "OCCASIONAL", "FREQUENT"]),
  dietaryPattern: z.enum([
    "BALANCED",
    "VEGETARIAN",
    "VEGAN",
    "HIGH_PROTEIN",
    "HIGH_CARB",
    "LOW_FAT",
    "KETO",
    "GLUTEN_FREE",
    "NO_SPECIAL_DIET",
  ]),
  physicalActivity: z.enum(["VERY_RARE", "RARE", "MODERATE", "REGULAR"]),
});

export type LifestylePayload = z.infer<typeof lifestyleSchema>;
