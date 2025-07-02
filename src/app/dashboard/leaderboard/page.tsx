import DashboardNav from "@/src/components/elements/DashboardNav";
import { User, Character, Level } from "@prisma/client";
import { cache } from "react";
import { leaderboardDetails } from "@/src/libs/fetch/profile";
import Link from "next/link";
import PlayerProfile from "@/src/components/character/PlayerProfile";
export type Leaderboard = User & {
  Character: (Character & { level: Level | null }) | null;
};
const getLeaderboardItems = cache(() => leaderboardDetails());
export default async function LeaderboardPage() {
  const leaderBoard: Leaderboard[] | undefined = await getLeaderboardItems();

  return (
    <>
      <DashboardNav title="Learderboard" />

      <div className="min-h-screen text-white">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-8">
          {leaderBoard?.map((player, index) => (
            <Link href={`/player/${player.id}`} key={index}>
              <PlayerProfile data={player} index={index} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
