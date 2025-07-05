"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  video?: string;
}

const features: Feature[] = [
  {
    title: "Personalized AI Insights",
    description:
      "Tailored habits for your unique health journey. Get personalized insights and recommendations.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    video: "/video/Habit-Showcase.mp4",
  },
  {
    title: "Fun & Gamified",
    description:
      "Earn XP, level up your character, and unlock achievements as you complete habits.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    ),
    video: "/video/Mission-Showcase.mp4",
  },
  {
    title: "Community Driven",
    description:
      "Stay motivated by competing on the leaderboard and sharing progress with others.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
    video: "/video/Leaderboard-Showcase.mp4",
  },
];

export default function FeatureSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 11000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
        <div className=" p-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className={`cursor-pointer flex items-center ${
                  index === currentIndex ? "font-bold" : "opacity-70"
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="">
                  <h2 className="text-xl">{feature.title}</h2>

                  {index === currentIndex && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`description-${currentIndex}`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                      >
                        <p className="text-lg">
                          {features[currentIndex].description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right column: Regular slideshow */}
        <div className="relative bg-card aspect-video rounded-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center w-full h-full"
            >
              <video
                loop
                autoPlay
                className="h-full w-full rounded-xl"
                controls
              >
                <source
                  className="w-full h-full"
                  src={features[currentIndex].video}
                  type="video/mp4"
                />
              </video>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
