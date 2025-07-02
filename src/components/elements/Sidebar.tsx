"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { GiHealing, GiHealthDecrease } from "react-icons/gi";
import { TbHealthRecognition } from "react-icons/tb";
import { PiNotepadFill } from "react-icons/pi";
import { RiVipCrown2Fill } from "react-icons/ri";
import { RiHealthBookFill } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
export const dashboardMenuItems = [
  { icon: TbHealthRecognition, text: "Habits", path: "/dashboard/my-habits" },
  { icon: PiNotepadFill, text: "Mission", path: "/dashboard/my-missions" },
  { icon: GiHealing, text: "Character", path: "/dashboard/my-character" },
  {
    icon: RiVipCrown2Fill,
    text: "Leaderboard",
    path: "/dashboard/leaderboard",
  },
  {
    icon: RiHealthBookFill,
    text: "Biometrics",
    path: "/dashboard/my-biometrics",
  },
];
const Sidebar = () => {
  const { data } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={sidebarVariants}
      className="overflow-hidden backdrop-blur-xl"
    >
      <div className=" h-full flex-col md:flex">
        <nav className="flex-grow">
          <div className="flex w-full justify-center py-4">
            <GiHealthDecrease className="text-4xl" />
          </div>
          <ul className="space-y-4">
            {dashboardMenuItems.map((item, index) => (
              <motion.li
                onClick={() => router.push(item.path)}
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href="#"
                  className={`flex items-center rounded-xl px-4 py-2 ${
                    item.path === pathname
                      ? "bg-primary text-white font-medium"
                      : ""
                  } hover:bg-primary`}
                >
                  <item.icon className="mr-3 h-6 w-6 text-white" />
                  <span>{item.text}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="rounded-xl bg-blue-500 p-4 text-white mt-10">
          <p className="text-sm">Logged in as</p>
          <p className="font-semibold">{data?.user?.name}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
