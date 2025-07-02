"use client";
import * as React from "react";

import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserDetails } from "@/src/app/(profile)/player/[playerId]/page";
import { cn } from "@/lib/utils";

const DetailProfile: React.FunctionComponent<{ data: UserDetails }> = (
  props
) => {
  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8 bg-card rounded-xl p-8"
      >
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-start gap-4"
        >
          <Avatar className="w-16 h-16">
            <AvatarImage src={props?.data?.image as string} />
            <AvatarFallback>
              {props.data?.name?.charAt(0) as string}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{props?.data?.name}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {props.data?.healthAnalysis?.lifestyleModifications?.map(
                (habit, index) => (
                  <motion.span
                    key={habit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm bg-gray-800 rounded-full px-3 py-1"
                  >
                    {habit.activity}
                  </motion.span>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-6 rounded-xl  bg-gradient-to-br from-gray-800/80 to-gray-950/20">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">
              {props.data?.Character?.level?.currentLevel}
            </span>
            <span className="text-sm text-gray-400">Level</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">
              {props.data?.Character?.level?.currentXP}
            </span>
            <span className="text-sm text-gray-400">XP</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">
              {props.data?.Character?.symbol}
            </span>
            <span className="text-sm text-gray-400">Badge</span>
          </div>
        </div>

        {/* Achievements */}
        <h1 className="text-2xl font-semibold">Badge</h1>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {props.data?.UserAchievement.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.1 }}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg text-2xl p-5 cursor-pointer",
                "bg-gradient-to-br from-primary/40 to-cyan-700/40 text-white"
              )}
            >
              {achievement.achievement.reward}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DetailProfile;
