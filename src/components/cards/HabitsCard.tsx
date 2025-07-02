"use client";
import * as React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import confetti from "canvas-confetti";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Calendar,
  Clock,
  Zap,
  Target,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { lifestyleAIResponse } from "@/src/types/genrateResponse";

interface IHabitCardProps {
  data: lifestyleAIResponse;
}

const HabitCard: React.FunctionComponent<IHabitCardProps> = (props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = React.useState<
    "overview" | "details" | "precautions"
  >("overview");

  const [isActive, setIsActive] = React.useState<boolean>(props.data.isActive);
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const handleConfettiOnElement = (event: React.MouseEvent) => {
    const { clientX, clientY } = event; // Koordinat klik
    const { innerWidth, innerHeight } = window;

    confetti({
      particleCount: 40,
      angle: 125,
      spread: 40,
      origin: {
        x: clientX / innerWidth, // Normalisasi X
        y: clientY / innerHeight, // Normalisasi Y
      },
    });
  };

  <canvas
    className="z-10 "
    ref={canvasRef}
    style={{
      width: "100%",
      zIndex: 10,
      height: "100%",
      position: "absolute",
      top: 0,
      right: 0,
      pointerEvents: "none",
    }}
  />;

  const updateAchivmentsForHabits = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/achievement/record/habit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  };
  const updateMission = async (habitId: string) => {
    try {
      const payload = {
        habitId: habitId,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mission/record`, // Use relative URL
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(
            responseData
          )}`
        );
      } else {
        await updateAchivmentsForHabits();
      }

      return response;
    } catch (error) {
      console.error("Error updating mission:", error);
      throw error;
    }
  };

  const updateHabit = async (habitId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lifestyle/record`, // Use relative URL
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: habitId,
          }),
        }
      );

      if (response.status === 200) {
        await updateMission(habitId);
        setIsActive(false);
      }
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleUpdateHabit = async () => {
    try {
      await updateHabit(props.data.id);
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  return (
    <Card
      className={`w-full h-fit p-7 relativetransition-all duration-300 ease-in-out relative`}
    >
      <div className="w-full left-1/2 bottom-0 absolute hover:opacity-100 opacity-0 animate-bounce ">
        <div onClick={() => setIsClicked(!isClicked)} className="w-full">
          <IoIosArrowDown
            className={`text-3xl ${isActive ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
      <div className="flex  items-center justify-between ">
        <CardHeader className="p-0 text-xl">{props.data.activity}</CardHeader>
        <CardContent className="p-0 relative">
          <Checkbox
            checked={!isActive}
            onClick={(event) => {
              if (isClicked == false) {
                handleConfettiOnElement(event);
              } else {
                setIsClicked(false);
              }
            }}
            onCheckedChange={() => {
              setTimeout(() => {
                if (isActive == true && props.data.isActive == true) {
                  setIsActive(false);
                  handleUpdateHabit();
                } else {
                  setIsActive(false);
                }
              }, 200);
            }}
            className="w-6 h-6"
          />
        </CardContent>
      </div>
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 space-y-4"
          >
            <div className="flex justify-between items-center mb-2 mt-4">
              <motion.div
                className="text-sm font-medium mx-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" />
                Impact Factor
              </motion.div>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Progress
                value={props.data.impactFactor * 100}
                className="h-2 mb-2"
              />
            </motion.div>
            <p className="text-center text-sm mb-4">
              {(props.data.impactFactor * 100).toFixed(0)}% Effective
            </p>

            <div className="md:flex justify-around mb-4">
              {(["overview", "details", "precautions"] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                      <span>{props.data.implementationPlan.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                      <span>{props.data.implementationPlan.frequency}</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-indigo-500" />
                      <span>{props.data.implementationPlan.intensity}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-indigo-500" />
                      Target Conditions:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {props.data.targetConditions.map((condition, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Badge variant="outline">{condition}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "precautions" && (
                <motion.div
                  key="precautions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold mb-2">Precautions:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {props.data.implementationPlan.precautions.map(
                      (precaution, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-start">
                            <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                            <span>{precaution}</span>
                          </div>
                        </motion.li>
                      )
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default HabitCard;
