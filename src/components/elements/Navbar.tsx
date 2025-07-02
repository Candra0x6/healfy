"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { GiHealthDecrease } from "react-icons/gi";
import { motion } from "framer-motion";
export default function Navbar({ user }: { user: Session }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out mx-auto rounded-lg max-w-6xl
        ${
          isScrolled
            ? "bg-card/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-md mt-5"
            : "w-full"
        }`}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <nav className=" flex justify-between w-full items-center py-5 px-10">
        <div className="flex">
          <GiHealthDecrease className="text-4xl" />
        </div>
        {user?.user ? (
          <Button
            onClick={() => router.push("/dashboard/my-habits")}
            className="px-7"
          >
            Dashboard
          </Button>
        ) : (
          <Button className="px-7" onClick={() => router.push("/sign-in")}>
            Login
          </Button>
        )}
      </nav>
    </motion.header>
  );
}
