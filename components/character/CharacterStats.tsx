"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BadgeCharacter, Character, Level } from "@prisma/client";
import toast from "react-hot-toast";

// Define base path for assets
const BASE_PATH = "/image/character-assets";

// Define character assets structure
const CHARACTER_ASSETS = {
  MALE: {
    1: `${BASE_PATH}/man/man-1.png`,
    2: `${BASE_PATH}/man/man-2.png`,
    3: `${BASE_PATH}/man/man-3.png`,
    4: `${BASE_PATH}/man/man-4.png`,
    5: `${BASE_PATH}/man/man-5.png`,
  },
  FEMALE: {
    1: `${BASE_PATH}/women/women-1.png`,
    2: `${BASE_PATH}/women/women-2.png`,
    3: `${BASE_PATH}/women/women-3.png`,
    4: `${BASE_PATH}/women/women-4.png`,
    5: `${BASE_PATH}/women/women-5.png`,
  },
} as const;

export type CharacterLevel = Character & { level: Level };

type CharacterStatsProps = {
  badges: BadgeCharacter[] | undefined;
  character: CharacterLevel | undefined;
};

export default function CharacterStats({
  badges,
  character,
}: CharacterStatsProps) {
  const [badgeSelected, setBadgeSelected] = useState<string>("");

  const updateUseBadge = async (badgeName: string, badge: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/character/badge/use`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: badgeName,
            reward: badge,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update badge");
      }

      const badgeData = await response.json();
      setBadgeSelected(badgeData.data.symbol);
    } catch (error) {
      console.error("Error updating badge:", error);
      toast.error("Failed to update badge");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const characterImage =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    CHARACTER_ASSETS[character.gender]?.[character.level.currentLevel];

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-card rounded-xl p-8 h-fit flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center relative">
          <h1 className="text-3xl">{badgeSelected}</h1>
          <div className="flex relative">
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div
                className="w-1/2 h-1/2 bg-gradient-to-tr from-blue-500 to-teal-500 rounded-full blur-3xl"
                style={{
                  animationDelay: "0.5s",
                  opacity: (character?.level?.currentLevel ?? 0) * 0.5,
                }}
              />
            </div>
            {characterImage && (
              <Image
                src={characterImage}
                alt={`Level ${
                  character?.level.currentLevel
                } ${character?.gender.toLowerCase()} character`}
                className="z-10"
                loading="lazy"
                width={150}
                height={150}
              />
            )}
          </div>
          <div className="w-full flex flex-col items-center space-y-2">
            <h1 className="font-bold">Level {character?.level.currentLevel}</h1>
            <Progress
              className="w-full"
              value={character?.level.percentageToNextLevel}
            />
            <div className="flex justify-between w-full">
              <p className="text-xs">{character?.level.currentXP} XP</p>
              <p className="text-xs">{character?.level.requiredXP} XP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex">
            <h1 className="font-bold text-4xl">Hi, {character?.name}</h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-0">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl font-bold mb-4">
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <motion.div
                  variants={containerVariants}
                  className="grid md:grid-cols-8 grid-cols-5 gap-2"
                >
                  {badges?.map((badge) => (
                    <motion.div
                      key={badge.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      className={cn(
                        "flex items-center justify-center rounded-lg p-2 aspect-square lg:text-2xl  text-xl cursor-pointer",
                        badgeSelected === badge.symbol
                          ? "bg-gradient-to-br from-primary/40 to-cyan-700/40 text-white"
                          : "bg-gray-700/20 text-gray-600"
                      )}
                      onClick={() => updateUseBadge(badge.name, badge.symbol)}
                    >
                      {badge.symbol}
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
