"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RiSettings2Fill } from "react-icons/ri";

export default function DashboardNav(props: { title: string }) {
  const router = useRouter();
  return (
    <nav className="flex justify-between py-5 items-center">
      <h1 className="font-bold text-2xl">{props.title}</h1>
      <div onClick={() => router.push("/setting")} className="cursor-pointer">
        <RiSettings2Fill className="text-2xl" />
      </div>
    </nav>
  );
}
