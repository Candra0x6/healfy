"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { AchievementsResponse } from "@/src/app/dashboard/my-missions/page";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Progress } from "../ui/progress";
import { RainbowButton } from "../ui/rainbow-button";
import { Button } from "../ui/button";
import { BadgeCharacter, UserAchievement } from "@prisma/client";
import BoxRewardTrigger from "../reward/BoxOpen";
import toast from "react-hot-toast";

function AchivmentPart(props: { data: AchievementsResponse[] | undefined }) {
  const [selectedItem, setSelectedItem] = useState<AchievementsResponse | null>(
    null
  );

  const claimAchievement = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/achievement/claim`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            achivementId: id,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error claiming achievement:", error);
      throw error;
    }
  };

  const newCharacterBadge = async ({
    rewardName,
    reward,
  }: {
    rewardName: string;
    reward: string;
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/character/badge/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: rewardName,
            reward: reward,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error claiming achievement:", error);
      throw error;
    }
  };

  const handleClaim = async ({
    achivementId,
    rewardName,
    reward,
  }: {
    achivementId: string;
    rewardName: string;
    reward: string;
  }): Promise<
    [
      { message: string; data: UserAchievement },
      { message: string; data: BadgeCharacter }
    ]
  > => {
    try {
      const [achievementResponse, badgeResponse] = await Promise.all([
        claimAchievement(achivementId),
        newCharacterBadge({ rewardName, reward }),
      ]);

      return [achievementResponse, badgeResponse];
    } catch (error) {
      console.error("Error claiming achievement:", error);
      throw error;
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

  return (
    <Card className="border-0 bg-card backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-3 gap-4 md:grid-cols-10"
        >
          {props?.data?.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg text-2xl  cursor-pointer",
                item.currentProgress === item.achievement.requirement
                  ? "bg-gradient-to-br from-primary/40 to-cyan-700/40 text-white"
                  : "bg-gray-700/20 text-gray-600"
              )}
            >
              <Popover>
                <PopoverTrigger className="w-full aspect-square">
                  <h1>{item.achievement.reward}</h1>
                </PopoverTrigger>
                <PopoverContent className="bg-slate-900/30 backdrop-blur-xl shadow-black/10 shadow-xl rounded-xl">
                  <AnimatePresence>
                    {selectedItem && (
                      <DetailsCard
                        item={selectedItem}
                        handleClaim={handleClaim}
                      />
                    )}
                  </AnimatePresence>
                </PopoverContent>
              </Popover>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}

export default AchivmentPart;
const cardVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const DetailsCard = ({
  item,
  handleClaim,
}: {
  item: AchievementsResponse;
  handleClaim: ({
    achivementId,
    rewardName,
    reward,
  }: {
    achivementId: string;
    rewardName: string;
    reward: string;
  }) => Promise<
    [
      { message: string; data: UserAchievement },
      { message: string; data: BadgeCharacter }
    ]
  >;
}) => {
  const [isClaimed, setIsClaimed] = useState(item.isClaimed);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="rounded-xl "
    >
      <h3 className="mb-2 text-xl font-bold">{item.achievement.title}</h3>
      <p className="mb-4 ">{item.achievement.description}</p>
      <div className="flex w-full justify-center relative items-center">
        <h1 className="absolute text-sm text-white z-10">
          {item.currentProgress} / {item.achievement.requirement}
        </h1>
        <Progress
          value={(item.currentProgress / item.achievement.requirement) * 100}
        />
      </div>
      {item.currentProgress === item.achievement.requirement ? (
        <BoxRewardTrigger
          isClaimed={isClaimed}
          cover={item.achievement.reward as string}
          data={{ reward: item.achievement.reward as string, amount: 1 }}
        >
          <RainbowButton
            onClick={async () => {
              try {
                await handleClaim({
                  achivementId: item.achievement.id,
                  rewardName: item.achievement.title,
                  reward: item.achievement.reward as string,
                });
                setIsClaimed(true);
              } catch {
                toast.error("Failed Claim Achievement");
              }
            }}
            disabled={isClaimed}
            className={`mt-4 w-full ${isClaimed ? "opacity-50" : ""}`}
          >
            {isClaimed ? "Already Claimed" : "Claim"} {item.achievement.reward}
          </RainbowButton>
        </BoxRewardTrigger>
      ) : (
        <Button
          disabled={true}
          className="mt-4 w-full bg-black opacity-40 hover:bg-black"
        >
          Claim {item.achievement.reward}
        </Button>
      )}
    </motion.div>
  );
};
