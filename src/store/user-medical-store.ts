import { create } from "zustand";
import { HealthAnalysis } from "../types/genrateResponse";
import {
  BiometricsData,
  LifestyleData,
  MedicalHistory,
} from "../types/medicalBiometrics";

interface UserStore {
  biometrics: BiometricsData | null;
  lifestyle: LifestyleData | null;
  medicalHistory: MedicalHistory | null;
  generateContentResponse: HealthAnalysis | null;
  updateUserBiometrics: (details: BiometricsData) => void;
  updateUserLifestyle: (lifestyle: LifestyleData) => void;
  updateMedicalHistory: (history: string[]) => void;
  updateGenerateContentResponse: (response: HealthAnalysis) => void;
}

export const useUserMedicalStore = create<UserStore>((set) => ({
  biometrics: null,
  lifestyle: null,
  medicalHistory: null,
  generateContentResponse: null,
  updateGenerateContentResponse: (response) =>
    set(() => ({ generateContentResponse: response })),
  updateUserBiometrics: (details) => set(() => ({ biometrics: details })),
  updateUserLifestyle: (lifestyle) => set(() => ({ lifestyle: lifestyle })),
  updateMedicalHistory: (history) => set(() => ({ medicalHistory: history })),
}));
