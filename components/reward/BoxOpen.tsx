"use client";
import { motion } from "framer-motion";

interface GachaBoxProps {
  onClick: () => void;
  cover: string;
}

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function BoxRewardTrigger({
  children,
  data,
  cover,
  isClaimed,
}: {
  children: React.ReactNode;
  cover: string;
  data: {
    reward: string;
    amount: number;
  };
  isClaimed: boolean;
  isDone? : boolean
}) {
  const convertData = Object.values({ data });
  return (
    <>
      <Dialog>
        <DialogTrigger disabled={isClaimed} className="w-full">
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Box Reward</DialogTitle>
          <BoxRewardCard cover={cover} data={convertData} />{" "}
        </DialogContent>
      </Dialog>
    </>
  );
}
export function BoxRewardCard(props: {
  cover: string;
  data: {
    reward: string;
    amount: number;
  }[];
}) {
  const [gameState, setGameState] = useState("initial");
  const [currentRewardIndex, setCurrentRewardIndex] = useState(0);
  const [revealedRewards, setRevealedRewards] = useState<
    { reward: string; amount: number }[]
  >([]);

  const handleBoxClick = () => {
    if (gameState === "initial") {
      setGameState("revealing");
    } else if (gameState === "revealing") {
      if (currentRewardIndex < props.data.length - 1) {
        setRevealedRewards([
          ...revealedRewards,
          props.data[currentRewardIndex],
        ]);
        setCurrentRewardIndex(currentRewardIndex + 1);
      } else {
        setRevealedRewards([
          ...revealedRewards,
          props.data[currentRewardIndex],
        ]);
        setGameState("summary");
      }
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="rounded-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === "initial" && (
            <GachaBox
              key="gacha-box"
              cover={props.cover}
              onClick={handleBoxClick}
            />
          )}
          {gameState === "revealing" && (
            <RewardReveal
              key="reward-reveal"
              data={props.data[currentRewardIndex]}
              onClick={handleBoxClick}
            />
          )}
          {gameState === "summary" && (
            <RewardSummary key="reward-summary" data={revealedRewards} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function GachaBox({ onClick }: GachaBoxProps) {
  return (
    <motion.div
      className="h-64 rounded-2xl cursor-pointer flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
    >
      <motion.span
        className="text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        📦
      </motion.span>
    </motion.div>
  );
}

interface RewardRevealProps {
  data: {
    reward: string;
    amount: number;
  };
  onClick: () => void;
}

function RewardReveal({ data, onClick }: RewardRevealProps) {
  return (
    <motion.div
      className="h-64 cursor-pointer flex flex-col items-center justify-center"
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={onClick}
    >
      <motion.h1
        className="text-5xl mb-4 "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {data.reward}{" "}
      </motion.h1>
      <motion.h2
        className="text-xl font-bold text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {data.amount}
      </motion.h2>
    </motion.div>
  );
}

interface RewardSummaryProps {
  data: {
    reward: string;
    amount: number;
  }[];
}

function RewardSummary({ data }: RewardSummaryProps) {
  return (
    <motion.div
      className="w-full h-64 flex flex-col items-center "
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">Your Rewards</h2>

      <DialogClose asChild>
        <ul className="space-y-4 mb-6 cursor-pointer">
          {data.map((reward, index) => (
            <motion.li
              key={index}
              className=" text-3xl grid grid-rows-2 place-items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h1 className="text-5xl">{reward.reward}</h1>
              <span className="font-medium">{reward.amount}</span>
            </motion.li>
          ))}
        </ul>
      </DialogClose>
    </motion.div>
  );
}
