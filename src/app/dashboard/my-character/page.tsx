import CharacterStats, {
  CharacterLevel,
} from "@/src/components/character/CharacterStats";
import DashboardNav from "@/src/components/elements/DashboardNav";
import { badgeDetails, characterDetails } from "@/src/libs/fetch/character";
import { Metadata } from "next";
import { cache } from "react";
export const metadata: Metadata = {
  title: "Character",
  description: "Character Details",
};
export const dynamic = "force-dynamic";

const getCharacterBadgeItems = cache(() => badgeDetails());
const getCharacterDetailsItems = cache(() => characterDetails());

export default async function PlayfulCharacterPage() {
  const character = await getCharacterDetailsItems();
  const badges = await getCharacterBadgeItems();
  return (
    <>
      <DashboardNav title="Character" />

      <div className="max-w-6xl w-full overflow-hidden">
        <CharacterStats
          badges={badges}
          character={character as CharacterLevel}
        />
      </div>
    </>
  );
}
