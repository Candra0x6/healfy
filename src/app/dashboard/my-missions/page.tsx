import DashboardNav from "@/src/components/elements/DashboardNav";
import AchivmentPart from "@/src/components/mission-element/AchivmentPart";
import DailyCheckin from "@/src/components/mission-element/DailyCheckin";
import DailyGuest from "@/src/components/mission-element/DailyGuest";
import {
  detailAchievements,
  detailCheckIn,
  detailMissions,
} from "@/src/libs/fetch/mission";
import { Mission, UserAchievement, Achievement } from "@prisma/client";
import { Metadata } from "next";
import React, { cache, Suspense } from "react";

export type AchievementsResponse = UserAchievement & {
  achievement: Achievement;
};

export const metadata: Metadata = {
  title: "My Missions - Healthy",
  description: "View your missions",
};
export const dynamic = "force-dynamic";

const getMissionItems = cache(() => detailMissions());
export type MissionResponse = Awaited<ReturnType<typeof getMissionItems>>;
const getAchievementsItems = cache(() => detailAchievements());
const getCheckinItems = cache(() => detailCheckIn());

export default async function MyMission() {
  const mission = await getMissionItems();
  const achievements = await getAchievementsItems();
  const checkin = await getCheckinItems();
  return (
    <>
      <DashboardNav title="Missions" />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="col-span-1 gap-4 bg-card p-8 space-y-4 rounded-xl ">
          <h1 className="font-bold text-2xl">Missions quest 🚀</h1>
          <div className="flex flex-col h-[400px] overflow-scroll gap-5">
            <Suspense fallback={<div>Loading...</div>}>
              {mission?.map((mission: Mission, i: number) => {
                return <DailyGuest key={i} data={mission} />;
              })}
            </Suspense>
          </div>
        </div>
        <div className="md:col-span-1 bg-card rounded-xl p-8">
          <h1 className="font-bold text-2xl mb-5">Daily checkin 🫡</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <DailyCheckin data={checkin} />
          </Suspense>
        </div>
        <div className="md:col-span-2 bg-card w-full h-full rounded-xl">
          <Suspense fallback={<div>Loading...</div>}>
            <AchivmentPart data={achievements} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
