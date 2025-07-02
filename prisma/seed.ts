import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const wellnessWarriorAchievement = await prisma.achievement.create({
    data: {
      title: "Wellness Warrior",
      description:
        "You must complete 5 habits this week to maintain your well-being. 🛡️ Your body thanks you!",
      reward: "🛡️",
      requirement: 5, // Number of habits completed
      category: "HABIT",
    },
  });

  const healthyHeroAchievement = await prisma.achievement.create({
    data: {
      title: "Healthy Hero",
      description:
        "You must complete 10 healthy habits this month. 🌟 Consistency is the key to health!",
      reward: "✨",
      requirement: 10,
      category: "HABIT",
      // Number of habits completed
    },
  });

  const fitnessFanaticAchievement = await prisma.achievement.create({
    data: {
      title: "Fitness Fanatic",
      description:
        "Complete 3 different fitness-related habits this week to earn this achievement! 💪 Keep moving!",
      reward: "🏅",
      requirement: 3,
      category: "HABIT",
      // Fitness habits completed
    },
  });

  const balanceBossAchievement = await prisma.achievement.create({
    data: {
      title: "Balance Boss",
      description:
        "Achieve balance by completing 4 habits that include rest, nutrition, exercise, and mindfulness this week. ⚖️",
      reward: "🌈",
      requirement: 4,
      category: "HABIT",
      // Balanced habits completed
    },
  });

  const ultimateHealthGuruAchievement = await prisma.achievement.create({
    data: {
      title: "Ultimate Health Guru",
      description:
        "Complete 15 healthy habits to unlock the guru level of health. 🧘 Your dedication inspires others!",
      reward: "🌟",
      requirement: 15,
      category: "HABIT",
      // Number of habits completed
    },
  });

  const everydayChampionAchievement = await prisma.achievement.create({
    data: {
      title: "Everyday Champion",
      description:
        "Complete at least one healthy habit every day for a week. 🏆 Small steps, big rewards!",
      reward: "🏆",
      requirement: 7,
      category: "HABIT",
      // Number of days with at least one habit completed
    },
  });

  const mindfulMoverAchievement = await prisma.achievement.create({
    data: {
      title: "Mindful Mover",
      description:
        "Complete 5 habits focused on mindfulness and movement to unlock this badge. 🌿",
      reward: "🌿",
      requirement: 5,
      category: "HABIT",
      // Mindfulness and movement habits completed
    },
  });

  const healthPioneerAchievement = await prisma.achievement.create({
    data: {
      title: "Health Pioneer",
      description:
        "Complete 20 habits across any category to forge a path toward your healthiest self. 🌍",
      reward: "🏔️",
      requirement: 20,
      category: "HABIT",
      // Total number of habits completed
    },
  });

  const vitalitySeekerAchievement = await prisma.achievement.create({
    data: {
      title: "Vitality Seeker",
      description:
        "Achieve level 2 and unlock a new step toward ultimate vitality! 🔥",
      reward: "❤️",
      requirement: 1,
      requirementLevel: 2,
      category: "LEVEL", // Level requirement
    },
  });

  const enduranceChampionAchievement = await prisma.achievement.create({
    data: {
      title: "Endurance Champion",
      description:
        "Level up to 3 by staying consistent and committed to your habits! ⚡",
      reward: "💖",
      requirement: 1,
      requirementLevel: 3,
      category: "LEVEL", // Level requirement
    },
  });

  const flourishingSpiritAchievement = await prisma.achievement.create({
    data: {
      title: "Flourishing Spirit",
      description: "Grow to level 4 and watch your spirit thrive! ❤️‍🔥",
      reward: "❤️‍🔥",
      requirement: 1,
      requirementLevel: 4,
      category: "LEVEL", // Level requirement
    },
  });

  console.log({
    wellnessWarriorAchievement,
    healthyHeroAchievement,
    fitnessFanaticAchievement,
    balanceBossAchievement,
    ultimateHealthGuruAchievement,
    everydayChampionAchievement,
    mindfulMoverAchievement,
    healthPioneerAchievement,
    vitalitySeekerAchievement,
    enduranceChampionAchievement,
    flourishingSpiritAchievement,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
