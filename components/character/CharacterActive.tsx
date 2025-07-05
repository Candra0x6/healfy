"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Award, Gift } from "lucide-react";
function CharacterActive() {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-card backdrop-blur-lg border-transparent shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Gift className="w-6 h-6 text-yellow-400" />
            Daily Achievements
          </CardTitle>
          <CardDescription className="text-gray-300">
            Track your daily health goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white rounded-full">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-white">Current Streak</p>
                <p className="text-sm text-indigo-100">
                  Keep up the good work!
                </p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">1 day</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CharacterActive;
