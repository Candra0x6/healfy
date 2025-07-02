"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Leaderboard } from "@/src/app/dashboard/leaderboard/page";
import GoldMedal from "@/public/icon/medal/gold-medal.png";
import SilverMedal from "@/public/icon/medal/silver-medal.png";
import BronzeMedal from "@/public/icon/medal/bronze-medal.png";

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
      className="bg-card"
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
              alt="Gold Medal"
              className="aspect-square w-10 self-end ml-auto"
            />
          )}
          {index === 1 && (
            <Image
              src={SilverMedal}
              alt="Silver Medal"
              className="aspect-square w-10 self-end ml-auto"
            />
          )}
          {index === 2 && (
            <Image
              src={BronzeMedal}
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
