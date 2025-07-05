"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Leaderboard } from "@/app/dashboard/leaderboard/page";
// Medal images (using string paths instead of imports)
const GoldMedal = "/icon/medal/gold-medal.png";
const SilverMedal = "/icon/medal/silver-medal.png";
const BronzeMedal = "/icon/medal/bronze-medal.png";

function PlayerProfile({
  data,
  index,
}: {
  data: Leaderboard | undefined;
  index: number;
}) {
  const MotionCard = motion(Card);

  return (
    <MotionCard
      className="bg-card shadow-md shadow-foreground/10 rounded-lg hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <Avatar className="mr-2">
            <AvatarImage
              src={data?.image as string}
              alt={data?.name as string}
            />
            <AvatarFallback>{data?.name?.charAt(0) as string}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold flex ">{data?.name}</h3>
          {index === 0 && (
            <Image
              src={GoldMedal}
              width={40}
              height={40}
              alt="Gold Medal"
              className="aspect-square w-10 self-end ml-auto"
            />
          )}
          {index === 1 && (
            <Image
              src={SilverMedal}
              
              width={40}
              height={40}
              alt="Silver Medal"
              className="aspect-square w-10 self-end ml-auto"
            />
          )}
          {index === 2 && (
            <Image
              src={BronzeMedal}
              
              width={40}
              height={40}
              alt="Bronze Medal"
              className="aspect-square w-10 self-end ml-auto"
            />
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-bold">{data?.Character?.level?.currentLevel}</p>
            <p className="text-gray-400 text-sm">Level</p>
          </div>
          <div>
            <p className="font-bold">{data?.Character?.level?.currentXP}</p>
            <p className="text-gray-400 text-sm">XP</p>
          </div>
          <div>
            <p className="font-bold">{data?.Character?.symbol}</p>
            <p className="text-gray-400 text-sm">Badge</p>
          </div>
        </div>
      </CardContent>
    </MotionCard>
  );
}

export default PlayerProfile;
