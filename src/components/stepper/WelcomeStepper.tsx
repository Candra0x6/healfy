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
import { useUserMedicalStore } from "@/store/user-medical-store";
import { useRouter } from "next/navigation";
import { LoadingStethoscope } from "../skeleton/StethoschopeLoading";
import {
  BiometricsData,
  LifestyleData,
  MedicalHistory,
} from "@/types/medicalBiometrics";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

// API Functions
const makeApiCall = async (
  endpoint: string,
  method: string,
  body?: object
): Promise<any> => {
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `API call failed: ${response.status} ${response.statusText}`
      );
    }

    return { success: true, data, response };
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);
    throw new Error(`Failed to call ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const createInitialCharacter = async (userId: string, name : string) => {
  return makeApiCall("/api/character/new", "POST", { userId,  });
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
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { biometrics, lifestyle, medicalHistory } = useUserMedicalStore();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // Redirect if not authenticated
  if (!authLoading && !isAuthenticated) {
    router.push("/sign-in");
    return null;
  }

  // Show loading while checking authentication
  if (authLoading) {
    return <LoadingStethoscope />;
  }

  const handleApiError = (error: Error, context: string) => {
    const errorMessage = `Failed to ${context}: ${error.message}`;
    setError(errorMessage);
    toast.error(errorMessage);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    if (!characterName.trim()) {
      toast.error("Please enter a character name");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Track completed operations for rollback if needed
    const completedOperations = [];

    try {
      
      // Step 2: Submit medical data
      if (!biometrics || !lifestyle || !medicalHistory) {
        throw new Error("Medical data is missing. Please complete all forms.");
      }

      toast.loading("Processing medical data...", { id: "setup-progress" });
      await submitMedicalData({
        biometrics,
        lifestyle,
        medicalHistory,
      });
      completedOperations.push("medical");

      // Step 3: Create mission
      toast.loading("Setting up missions...", { id: "setup-progress" });
      const missionResponse = await createMission();
      if (!missionResponse?.ok) {
        throw new Error("Failed to create mission");
      }
      completedOperations.push("mission");

      // Step 4: Update character name
      toast.loading("Updating character name...", { id: "setup-progress" });
      await updateCharacterName(characterName.trim(), biometrics.gender);
      completedOperations.push("characterName");

      // Step 5: Initialize achievements
      toast.loading("Setting up achievements...", { id: "setup-progress" });
      const achievementResult = await initialAchievements();
      completedOperations.push("achievements");

      // Step 6: Initialize check-in
      toast.loading("Finalizing setup...", { id: "setup-progress" });
      const checkinResult = await initialCheckin();
      completedOperations.push("checkin");

      // Success!
      toast.success("Setup completed successfully!", { id: "setup-progress" });
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard/my-habits");
      }, 1000);

    } catch (error) {
      console.error("Setup failed:", error);
      
      // Show specific error message
      const errorMessage = error instanceof Error ? error.message : "Setup failed. Please try again.";
      
      toast.error(errorMessage, { id: "setup-progress" });
      setError(errorMessage);
      
      // Log completed operations for debugging
      console.log("Completed operations before failure:", completedOperations);
      
      setIsLoading(false);
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
          className="bg-card"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Button>
      )}
      <h1 className="text-3xl font-bold text-foreground ml-4">{title}</h1>
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
    <div className="min-h-screen text-gray-100 p-6">
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
                  className="text-foreground"
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
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="characterName" className="block text-sm font-medium text-foreground mb-2">
                        Character Name
                      </label>
                      <Input
                        id="characterName"
                        type="text"
                        placeholder="Enter your character name (3-20 characters)"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                        className="w-full"
                        maxLength={20}
                        minLength={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {characterName.length}/20 characters
                      </p>
                    </div>
                    <Button
                      onClick={handleSubmit}
                      className="w-full"
                      disabled={!characterName.trim() || characterName.trim().length < 3 || isLoading}
                    >
                      {isLoading ? "Setting up..." : "Complete Setup"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
