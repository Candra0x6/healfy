"use client";

import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

export const LoadingStethoscope: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="relative w-32 h-32"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
      >
        <Stethoscope className="w-full h-full text-primary" />
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 -z-10"
          animate={{
            scale: [1.4, 1.7, 1.4],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
};
