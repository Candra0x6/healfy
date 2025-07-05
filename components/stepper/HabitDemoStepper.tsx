/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import { BiomatricsForm } from "../form/BiomatricsForm";
import { LifestyleForm } from "../form/LifestyleForm";

export default function WelcomeStepper() {
  const [step, setStep] = useState(1);
  const [habitName, setHabitName] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [checkins, setCheckins] = useState(0);
  const [completed, setCompleted] = useState(false);

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-xl mx-auto">
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

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
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
              <div className="flex items-center mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-3xl font-bold text-gray-300 ml-4">
                  Lifestyle
                </h1>
              </div>
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
              <div className="flex items-center mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-3xl font-bold text-gray-300 ml-4">
                  Set Your Character
                </h1>
              </div>
              {/* <div className="grid grid-cols-2 gap-4 mb-8">
                {characters.map((character) => (
                  <motion.button
                    key={character.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "bg-gray-800 p-4 rounded-xl flex flex-col items-center gap-2 transition-colors",
                      selectedCharacter === character.id
                        ? "bg-green-500/20 text-green-400"
                        : "hover:bg-gray-700"
                    )}
                    onClick={() => setSelectedCharacter(character.id)}
                  >
                    <span className="text-4xl">{character.avatar}</span>
                    <span className="text-lg text-gray-300">
                      {character.name}
                    </span>
                  </motion.button>
                ))}
              </div> */}
              <Input
                type="text"
                placeholder="Enter your character name"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 border-gray-700 mb-4"
              />
              <Button
                onClick={handleContinue}
                className="w-full"
                disabled={!characterName}
              >
                Continue
              </Button>
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
              <h1 className="text-3xl font-bold mb-8 text-gray-300">
                Habit Check-in
              </h1>
              <div className="bg-gray-800 p-6 rounded-xl mb-8">
                <h2 className="text-2xl font-semibold mb-4">{habitName}</h2>
                <p className="text-gray-400 mb-4">
                  Check in when you complete your habit!
                </p>
                <Button
                  onClick={() => setCheckins(checkins + 1)}
                  className="w-full py-4 text-lg bg-green-500 hover:bg-green-600 text-white rounded-xl mb-4"
                >
                  Check-in
                </Button>
                <p className="text-center text-gray-300">
                  Total check-ins: {checkins}
                </p>
              </div>
              <Button
                onClick={handleContinue}
                className="w-full py-6 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
              >
                Continue to Mission
              </Button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-8 text-gray-300">
                Complete the Mission
              </h1>
              <div className="bg-gray-800 p-6 rounded-xl mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Mission: Master {habitName}
                </h2>
                <p className="text-gray-400 mb-4">
                  Complete your habit 5 times to finish the mission!
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">Progress:</span>
                  <span className="text-gray-300">{checkins}/5</span>
                </div>
                <Progress
                  value={(checkins / 5) * 100}
                  className="h-2 bg-primary"
                />
              </div>
              <Button
                onClick={() => {
                  setCompleted(true);
                  handleContinue();
                }}
                className="w-full py-6 text-lg bg-green-500 hover:bg-green-600 text-white rounded-xl"
                disabled={checkins < 5}
              >
                Complete Mission
              </Button>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-8 text-gray-300">
                Mission Accomplished!
              </h1>
              <div className="bg-gray-800 p-6 rounded-xl mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-semibold mb-4">
                  {characterName} leveled up!
                </h2>
                <p className="text-gray-400 mb-4">
                  You&apos;ve earned the &quot;{habitName} Master&quot; badge!
                </p>
              </div>
              <Button
                onClick={handleContinue}
                className="w-full py-6 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
              >
                View Leaderboard
              </Button>
            </motion.div>
          )}

          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-8 text-gray-300">
                Leaderboard
              </h1>
              <div className="space-y-4">
                {[
                  { name: "Alice", score: 1000 },
                  { name: "Bob", score: 850 },
                  { name: characterName, score: 750 },
                  { name: "David", score: 600 },
                ].map((player, index) => (
                  <motion.div
                    key={player.name}
                    className="bg-gray-800 p-4 rounded-xl flex items-center justify-between"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{index + 1}</span>
                      <span className="text-lg text-gray-300">
                        {player.name}
                      </span>
                    </div>
                    <span className="text-lg text-gray-400">
                      {player.score}
                    </span>
                  </motion.div>
                ))}
              </div>
              <Button
                onClick={() => setStep(1)}
                className="w-full py-6 text-lg bg-green-500 hover:bg-green-600 text-white rounded-xl mt-8"
              >
                Start New Habit
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
