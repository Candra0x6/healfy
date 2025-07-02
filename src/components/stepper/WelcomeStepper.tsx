"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Input } from "../../components/ui/input";
import { BiomatricsForm } from "../form/BiomatricsForm";
import { LifestyleForm } from "../form/LifestyleForm";
import {
  MedicalHistoryFormCheckbox,
  createMission,
} from "../form/MedicalHistoryForm";
import { useUserMedicalStore } from "@/src/store/user-medical-store";
import { useRouter } from "next/navigation";
import { LoadingStethoscope } from "../skeleton/StethoschopeLoading";
import {
  BiometricsData,
  LifestyleData,
  MedicalHistory,
} from "@/src/types/medicalBiometrics";
import toast from "react-hot-toast";

// Types
interface ApiResponse {
  ok: boolean;
  status: number;
  statusText: string;
}

// API Functions
const makeApiCall = async (
  endpoint: string,
  method: string,
  body?: object
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );

    if (!response.ok) {
      throw new Error(
        `API call failed: ${response.status} ${response.statusText}`
      );
    }

    return response;
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);
    throw error;
  }
};

const updateCharacterName = async (name: string, gender: string) => {
  return makeApiCall("/api/character/change/name", "POST", { name, gender });
};

const initialAchievements = async () => {
  return makeApiCall("/api/achievement/new", "POST");
};

const initialCheckin = async () => {
  return makeApiCall("/api/checkin/new", "POST");
};

const submitMedicalData = async (data: {
  biometrics: BiometricsData;
  lifestyle: LifestyleData;
  medicalHistory: MedicalHistory;
}) => {
  return makeApiCall("/api/prompt", "POST", data);
};

// Component
export default function WelcomeStepper() {
  const [step, setStep] = useState(1);
  const [characterName, setCharacterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { biometrics, lifestyle, medicalHistory } = useUserMedicalStore();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleApiError = (error: Error, context: string) => {
    setError(`Failed to ${context}. Please try again.`);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Submit medical data
      if (!biometrics || !lifestyle || !medicalHistory) {
        toast.error("Biometrics data is missing");
        throw new Error("Biometrics data is missing");
      }

      await submitMedicalData({
        biometrics,
        lifestyle,
        medicalHistory,
      });

      // Create mission
      const missionResponse = await createMission();
      if (!missionResponse?.ok) {
        toast.error("Failed to create mission");
        throw new Error("Failed to create mission");
      }

      // Update character name
      await updateCharacterName(characterName, biometrics.gender);

      // Initialize achievements
      const achievementResponse = await initialAchievements();
      if (!achievementResponse?.ok) {
        toast.error("Failed to initialize achievements");
        throw new Error("Failed to initialize achievements");
      }

      // Initialize check-in
      const checkinResponse = await initialCheckin();
      if (!checkinResponse?.ok) {
        toast.error("Failed to initialize check-in");
        throw new Error("Failed to initialize check-in");
      }

      // Navigate to dashboard
      router.push("/dashboard/my-habits");
    } catch (error) {
      handleApiError(error as Error, "complete setup");
    }
  };

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    }
  };

  const renderStepHeader = (title: string, showBack = true) => (
    <div className="flex items-center mb-8">
      {showBack && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="hover:bg-card"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      )}
      <h1 className="text-3xl font-bold text-gray-300 ml-4">{title}</h1>
    </div>
  );

  const renderProgressBar = () => (
    <div className="mb-8">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Progress value={progress} className="h-2 bg-primary" />
      </motion.div>
      <div className="flex justify-between mt-2 text-sm text-gray-400">
        <span>
          Step {step} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );

  const renderError = () =>
    error && (
      <div className="mb-4 p-4 bg-red-500/20 text-red-400 rounded-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        {renderProgressBar()}
        {renderError()}

        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingStethoscope />
          ) : (
            <>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepHeader("Biometrics", false)}
                  <BiomatricsForm handleContinue={handleContinue} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepHeader("Lifestyle")}
                  <LifestyleForm handleContinue={handleContinue} />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepHeader("Medical History")}
                  <MedicalHistoryFormCheckbox
                    onContinue={handleContinue}
                    title="Continue"
                  />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepHeader("Set Your Character")}
                  <Input
                    type="text"
                    placeholder="Enter your character name"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="w-full bg-gray-800 text-gray-100 border-gray-700 mb-4"
                  />
                  <Button
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={!characterName}
                  >
                    Submit
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
