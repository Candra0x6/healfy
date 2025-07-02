export type MedicalHistory = string[];

export type BiometricsData = {
  age: number;
  gender: "MALE" | "FEMALE";
  avargeDailyBP: number;
  heartRate: number;
  restingHeartRate: number;
  waistCircumference: number;
  hipCircumference: number;
  height: number;
  weight: number;
};

export type LifestyleData = {
  smokingHabit: "NON_SMOKER" | "FORMER_SMOKER" | "ACTIVE_SMOKER";
  alcoholConsumption: "NEVER" | "OCCASIONAL" | "FREQUENT";
  dietaryPattern:
    | "BALANCED"
    | "VEGETARIAN"
    | "VEGAN"
    | "HIGH_PROTEIN"
    | "HIGH_CARB"
    | "LOW_FAT"
    | "KETO"
    | "GLUTEN_FREE"
    | "NO_SPECIAL_DIET";
  physicalActivity: "VERY_RARE" | "RARE" | "MODERATE" | "REGULAR";
};

export type MedicalData = {
  medicalHistory: MedicalHistory;
  biometrics: BiometricsData;
  lifestyle: LifestyleData;
};
