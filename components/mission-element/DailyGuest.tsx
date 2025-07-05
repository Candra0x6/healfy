"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Progress } from "../ui/progress";
import { Mission } from "@prisma/client";
import { Badge } from "../ui/badge";
import BoxRewardTrigger from "../reward/BoxOpen";
import toast from "react-hot-toast";
interface IMissionCardProps {
  data: Mission;
}

const DailyGuest: React.FunctionComponent<IMissionCardProps> = (props) => {
  const [isClaimed, setIsClaimed] = React.useState<boolean>(
    props.data.isClaimed
  );
  const updateClaimedMission = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mission/claim`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ missionId: id }),
        }
      );
      if (response.ok) {
        setIsClaimed(true);
      }
    } catch (error) {
      console.error("Error updating mission:", error);
      throw error;
    }
  };
  const updateCharacterLevel = async (id: string, xp: number) => {
    try {
      const payload = {
        id: id,
        xp: xp,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/character/level/up`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Character level updated successfully");
      }
    } catch (error) {
      console.error("Error updating character level:", error);
      throw error;
    }
  };
  const handleUpdateLevel = async () => {
    try {
      await Promise.all([
        updateClaimedMission(props.data.id),
        updateCharacterLevel(props.data.id, props.data.xpReward),
      ]);
    } catch (error) {
      console.error("Error updating character level:", error);
      throw error;
    }
  };

  return (
    <BoxRewardTrigger
      cover="🎁"
      data={{ reward: "XP 🛡️", amount: props.data.xpReward }}
      isClaimed={props.data.isDone == true && isClaimed == false ? false : true}
    >
      <motion.div
        aria-disabled={isClaimed && !props.data.isDone}
        onClick={
          props.data.isDone == true && isClaimed == false
            ? handleUpdateLevel
            : () => toast.error("Mission not completed yet")
        }
        className={`flex items-center gap-x-4 rounded-lg  ${
          props.data.isDone == true && isClaimed == false ? "" : "opacity-50"
        }`}
      >
        <div className="flex flex-col w-[90%] space-y-2">
          <h1 className="text-left">{props.data.title}</h1>
          <Progress
            value={(props.data.currentCount / props.data.requiredCount) * 100}
            className="h-3"
          />
          <div className="flex justify-between w-full">
            <Badge className="text-xs w-fit">
              {props.data.currentCount} / {props.data.requiredCount}
            </Badge>
            <h1 className="font-bold text-xs text-primary-foreground">
              {Math.round(
                (props.data.currentCount / props.data.requiredCount) * 100
              )}
              %
            </h1>
          </div>
        </div>
        <motion.div
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          {...(props.data.isDone == true && isClaimed == false
            ? {
                animate: {
                  y: ["0%", "-10%"],
                },
                transition: {
                  y: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                  repeatDelay: 1,
                },
              }
            : {})}
          className=" text-4xl cursor-pointer"
        >
          🎁
        </motion.div>
      </motion.div>
    </BoxRewardTrigger>
  );
};

export default DailyGuest;
