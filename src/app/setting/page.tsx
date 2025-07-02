"use client";

import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Character } from "@prisma/client";
import { TbArrowBackUp } from "react-icons/tb";

export default function GoogleAccountSettings() {
  const { data: session } = useSession();
  const [character, setCharacter] = useState<Character>();
  const handleLogOut = async () => {
    try {
      await signOut();
    } catch (error0) {
      console.error(error0);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };
  const updateCharacterName = async (name: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/character/change/name`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating character name:", error);
      throw error;
    }
  };

  const getCharacterData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/character`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCharacter(data.data);
    } catch (error) {
      console.error("Error getting character data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCharacterData();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100 md:px-0 px-3">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <button
          onClick={() => window.history.back()}
          className="hover:bg-card flex gap-x-2 items-center font-bold py-2 px-5 rounded-xl mb-5 hover:text-primary "
        >
          <TbArrowBackUp size={24} />
          Back
        </button>
        <Card className="shadow-black/10 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div variants={itemVariants} className="flex justify-center">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={session?.user.image as string}
                  alt="User's profile picture"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-xl font-semibold">{session?.user.name}</h2>
              <p className="text-gray-400">{session?.user.email}</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-gray-700 p-4 rounded-lg"
            >
              <h1 className="text-lg font-semibold mb-2">Character Details</h1>
              <h2 className="text-sm text-gray-400">Name</h2>
              <input
                defaultValue={character?.name}
                type="text"
                className="bg-transparent text-foreground text-xl font-bold mb-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateCharacterName(e.currentTarget.value);
                    setCharacter(
                      character && { ...character, name: e.currentTarget.value }
                    );
                  }
                }}
              />
              <h2 className="text-sm text-gray-400">Badge</h2>
              <p className="text-sm text-gray-400">{character?.symbol}</p>
            </motion.div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleLogOut}
              variant="destructive"
              className="w-full flex items-center justify-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
