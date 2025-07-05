"use client";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { GiHealing } from "react-icons/gi";
import { PiNotepadFill } from "react-icons/pi";
import { RiHealthBookFill, RiVipCrown2Fill } from "react-icons/ri";
import { TbHealthRecognition } from "react-icons/tb";
const dashboardMenuItems = [
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
const NavbarDashboardMobile: React.FunctionComponent = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="w-full bg-card/50 py-5 rounded-xl backdrop-blur-xl">
      <ul className="grid grid-cols-5 gap-x-2">
        {dashboardMenuItems.map((item, index) => (
          <li
            onClick={() => router.push(item.path)}
            key={index}
            className={`flex flex-col items-center justify-center cursor-pointer ${
              item.path === pathname ? "text-primary" : ""
            }`}
          >
            <div className="">
              <item.icon className="text-3xl" />
            </div>
            <span className="text-xs font-semibold">{item.text}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarDashboardMobile;
