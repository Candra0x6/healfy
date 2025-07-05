"use client";
import { Button } from "@/components/ui/button";
import { LifestyleModification } from "@prisma/client";
import HabitShowcaseCard from "@/components/cards/HabitShowcaseCard";
import React, { Fragment, useEffect, useState } from "react";
import FAQCard from "@/components/cards/FaqCard";
import confetti from "canvas-confetti";
import FeatureSlideshow from "@/components/slide/FeatureSlideShow";
// Character images (using string paths instead of imports)
const characterBored = "/image/character-assets/women/women-2.png";
const characterHappy = "/image/character-assets/women/women-3.png";
const characterHappySimple = "/image/character-assets/women/women-4.png";
const characterSuperHappy = "/image/character-assets/women/women-5.png";
const characterSad = "/image/character-assets/women/women-1.png";
import Image from "next/image";
import arrow from "../../../public/icon/arrow/Arrow 11.svg";
import Navbar from "@/components/elements/Navbar";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { RxDoubleArrowDown } from "react-icons/rx";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const faqs = [
    {
      question: "What is Healthy?",
      answer:
        "Healfy is a web app designed to help you build healthier habits. By analyzing your health data, lifestyle, and medical history, our AI recommends personalized habits to improve your well-being.",
    },
    {
      question: "How does AI Recommend Habits for me?",
      answer:
        "After filling out a simple form with your health details, lifestyle activities, and disease history, our AI analyzes the data to create a customized habit plan tailored to your needs.",
    },
    {
      question: "What is Character Feature?",
      answer:
        "Your character grows in happiness as you complete habits. Completing habits earns XP, which levels up your character, unlocks achievements, and earns badges.",
    },
    {
      question: "What are Badges and the Leaderboard?",
      answer:
        "Badges are rewards for completing specific milestones, like exercising consistently or drinking water regularly. You can also compete with others on the leaderboard to showcase your healthy habits!",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply sign up for an account, fill out the health form, and start building healthier habits today!",
    },
  ];

  const character = [
    {
      id: 1,
      image: characterSad,
    },
    {
      id: 2,
      image: characterBored,
    },
    {
      id: 3,
      image: characterHappy,
    },
    {
      id: 4,
      image: characterHappySimple,
    },
    {
      id: 5,
      image: characterSuperHappy,
    },
  ];

  const startedShowcase = [
    {
      title: "Tell Us About You!",
      icon: "📝",
    },
    {
      title: "Crush Those Habits! ",
      icon: "💪",
    },
    {
      title: "Watch Your Character Shine!",
      icon: "🌟",
    },
    
  ];
  const [onShow, setOnShow] = useState<number>(0);
  const dummyHabitData: LifestyleModification[] = [
    {
      id: "1",
      activity: "Running",
      impactFactor: 20,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      targetConditions: [""],
      implementationPlanId: "",
      healthAnalysisId: "",
    },
    {
      id: "2",
      activity: "Swimming",
      impactFactor: 15,
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      targetConditions: [""],
      implementationPlanId: "",
      healthAnalysisId: "",
    },
    {
      id: "3",
      activity: "Cycling",
      impactFactor: 25,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      targetConditions: [""],
      implementationPlanId: "",
      healthAnalysisId: "",
    },
    {
      id: "4",
      activity: "Yoga",
      impactFactor: 10,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      targetConditions: [""],
      implementationPlanId: "",
      healthAnalysisId: "",
    },
  
  ];
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  if (session) {
    router.push("/dashboard/my-habits");
  }
  const handleConfettiOnElement = (event: React.MouseEvent) => {
    const { clientX, clientY } = event; // Koordinat klik
    const { innerWidth, innerHeight } = window;

    confetti({
      particleCount: 40,
      angle: 125,
      spread: 40,
      origin: {
        x: clientX / innerWidth, // Normalisasi X
        y: clientY / innerHeight, // Normalisasi Y
      },
    });
  };

  return (
    <>
      <Navbar user={session as Session} />
      <main className="mx-auto max-w-6xl w-full flex flex-col dark:bg-black px-3">
        <section className=" min-h-screen relative">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-[14rem]">
            <div className="space-y-5 ">
              <h1 className="font-black text-7xl text-primary">
                Upgrade Your
                <br />
                <span className="text-foreground">Healthy Plan</span>
              </h1>
              <h3>
                Build better habits with ease and watch your health journey take
                off.
              </h3>
              <Button
                onClick={() => router.push("/sign-in")}
                className="rounded-full px-10 font-semibold"
              >
                GET STARTED
              </Button>
              <canvas
                className="z-10 "
                ref={canvasRef}
                style={{
                  width: "100%",
                  zIndex: 10,
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  pointerEvents: "none",
                }}
              />
            </div>
            <div className="w-full h-full flex flex-col items-end relative">
              <div className="  flex flex-col items-center relative">
                <div className="absolute z-10 -top-10 right-0">
                  <h1 className="font-bold text-xs mb-2 ">Tick of it.. 👇</h1>
                  <Image
                    alt="arrow"
                    src={arrow}
                    className="rotate-90 fill-primary"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="grid h-fit">


                {(dummyHabitData.length > onShow &&
                  dummyHabitData.map((habit, i) => (
                    <Fragment key={i}>
                      {i === onShow && i < dummyHabitData.length && (
                        <HabitShowcaseCard
                          handleConfetti={handleConfettiOnElement}
                          stateId={i}
                          setState={setOnShow}
                          key={habit.id}
                          data={habit}
                        />
                      )}
                    </Fragment>
                  ))) || (
                  <div
                    onClick={() => setOnShow(0)}
                    className="flex w-[400px] h-fit p-8 bg-card rounded-lg cursor-pointer"
                  >
                     “Woohoo! You did it!” — Lapi 🐰✨
                  </div>
                )}
                <div className="w-full flex justify-center mt-10 relative">
                  <div className="absolute z-10 right-0 top-0">
                    <h1 className="font-bold text-xs ">Make Lapi happy 😊</h1>
                    <Image
                      alt="arrow"
                      src={arrow}
                      className="rotate-180 fill-primary"
                      width={30}
                      height={30}
                    />
                  </div>
                  {character.map(
                    (item, i) =>
                      item.id === onShow + 1 && (
                        <div key={i} className="flex relative">
                          <div className="absolute inset-0 flex items-center justify-center ">
                            <div
                              className={`w-1/2 h-1/2 -z-10 bg-gradient-to-tr from-primary to-primary rounded-full blur-3xl`}
                              style={{
                                animationDelay: "0.5s",
                                opacity: 0 + onShow * 0.25,
                              }}
                            />
                          </div>
                          <Image
                            key={i}
                            alt="character"
                            className=" rounded-xl drop-shadow-xl shadow-black"
                            src={item.image}
                            width={350}
                            height={350}
                          />
                        </div>
                      )
                  )}{" "}
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-[14rem]">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-center">
              Let’s Make Healthy Fun! 🎉
            </h1>
            <p className="text-center">
              Turn your daily habits into an exciting journey toward better
              health and happiness!
            </p>
          </div>
          <div
            className="grid md:grid-cols-3 grid-cols-1 md:gap-x-5 place-items-center 
          place-content-center
          content-center gap-5"
          >
            {startedShowcase.map((item, i) => (
              <div
                key={i}
                className="w-full md:flex md:flex-row flex flex-col items-center"
              >
                <div className="bg-card w-full h-[200px] rounded-xl flex flex-col items-center justify-center gap-2">
                  <h1 className="text-4xl">{item.icon}</h1>
                  <h1 className="text-xl md:text-md font-semibold text-center">
                    {item.title}
                  </h1>
                </div>
                {i < startedShowcase.length - 1 && (
                  <RxDoubleArrowDown className=" text-3xl font-bold md:mt-0 md:ml-5 mt-5 md:-rotate-90" />
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="mb-[14rem]">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-center">
              See Healfy in Action! 🎥
            </h1>
            <p className="text-center">
              Watch how easy and fun it is to build healthier habits, level up
              your character, and achieve your goals!
            </p>
          </div>
          <FeatureSlideshow />
        </section>
        <section className="space-y-2">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-center">
              FAQs: Your Healfy Guide 🗒️{" "}
            </h1>
            <p className="text-center">
              Answers to the most common questions about habits, AI, and
              leveling up.
            </p>
          </div>
          {faqs.map((item, id) => (
            <FAQCard key={id} question={item.question} answer={item.answer} />
          ))}{" "}
        </section>
      </main>
      <footer className="bg-card shadow-md shadow-foreground text-center py-4 mt-10">
        <p className="text-sm text-muted-foreground">
          © 2024 Healfy. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Made with ❤️ by{" "}
        </p>
        </footer>
    </>
  );
}
