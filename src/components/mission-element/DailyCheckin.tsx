"use client";
import { CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TargetDay } from "@prisma/client";
import toast from "react-hot-toast";
export default function DailyCheckin({
  data,
}: {
  data: TargetDay[] | undefined;
}) {
  const [targetDays] = useState<TargetDay[] | undefined>(data);
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const updateCheckin = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkin/record`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("Successfuly Check-In 😁");
      } else {
        toast.error("Failed Check-In");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error getting character data:", error);
      throw error;
    }
  };

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {targetDays &&
            targetDays.map((day) => (
              <motion.div
                onClick={updateCheckin}
                key={day.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "relative rounded-lg p-4",
                  day.isCompleted
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-700/20 text-gray-400"
                )}
              >
                <motion.div
                  variants={floatVariants}
                  animate="float"
                  className="absolute right-2 top-2 text-2xl"
                >
                  {day.reward}
                </motion.div>
                <div className="space-y-2">
                  <div className="text-sm">Day {day.dayNumber}</div>
                  <CheckCircle2
                    className={`h-5 w-5 ${
                      day.isCompleted ? "text-green-400" : "text-gray-600"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
