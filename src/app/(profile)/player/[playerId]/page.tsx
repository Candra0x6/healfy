import DetailProfile from "@/components/profile/DetailProfile";
import BackButton from "@/components/units/BackButton";
import { detailPlayer } from "@/libs/fetch/profile";
import {
  Achievement,
  Character,
  HealthAnalysis,
  Level,
  LifestyleModification,
  Mission,
  User,
  UserAchievement,
} from "@prisma/client";
import React, { cache, Suspense } from "react";
export type UserDetails = User & { Character: Character & { level: Level } } & {
  healthAnalysis: HealthAnalysis & {
    lifestyleModifications: LifestyleModification[] & { mission: Mission[] };
  };
} & { UserAchievement: (UserAchievement & { achievement: Achievement })[] };
const getProfileDetails = cache(({ userId }: { userId: string }) =>
  detailPlayer({ userId })
);

export const metadata = {
  title: "Player Details",
  description: "Player Details",
};
type tParams = Promise<{ playerId: string }>;

export default async function PlayerDetails(props: { params: tParams }) {
  const playerId = (await props.params).playerId;
  const user = await getProfileDetails({ userId: playerId });
  if (!user) {
    return <div className="text-center">User not found</div>;
  }
  return (
    <div className="max-w-2xl mx-auto md:px-0 px-3">
      <div className="flex w-full justify-between py-10">
        <BackButton />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailProfile data={user as unknown as UserDetails} />
      </Suspense>
    </div>
  );
}
