import HabitCard from "@/src/components/cards/HabitsCard";
import DashboardNav from "@/src/components/elements/DashboardNav";
import { lifestyleAIResponse } from "@/src/types/genrateResponse";
import { Metadata } from "next";
import { cache, Suspense } from "react";
import detailLifestyle from "@/src/libs/fetch/lifestyle";

export const metadata: Metadata = {
  title: "My Habits - Healthy",
  description: "View your habits",
};
export const dynamic = "force-dynamic";

const getLifestyleItems = cache(() => detailLifestyle());
export type lifestyleResponse = Awaited<ReturnType<typeof getLifestyleItems>>;

export default async function MyHabits() {
  const habits: lifestyleAIResponse[] | undefined = await getLifestyleItems();
  console.log(habits);
  return (
    <>
      <DashboardNav title="Habits" />
      <div className="grid grid-cols-2 grid-flow-row gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          {Array.isArray(habits) &&
            habits.map((lifestyle, i) => (
              <HabitCard data={lifestyle} key={i} />
            ))}
        </Suspense>
      </div>
    </>
  );
}
