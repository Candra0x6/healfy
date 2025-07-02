interface LevelProgress {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXPForNextLevel: number;
  percentageToNextLevel: number;
}

export function calculateLevelProgress(currentXP: number): LevelProgress {
  // Define level thresholds
  const levelThresholds = [
    { level: 1, minXP: 0, maxXP: 210 },
    { level: 2, minXP: 210, maxXP: 430 },
    { level: 3, minXP: 430, maxXP: 840 },
    { level: 4, minXP: 840, maxXP: 1250 },
    { level: 5, minXP: 1250, maxXP: 1680 },
  ];

  // Find the current level
  const currentLevelConfig = levelThresholds.find(
    (threshold) => currentXP >= threshold.minXP && currentXP < threshold.maxXP
  );

  if (!currentLevelConfig) {
    // Fallback if no level matches (e.g., very high XP)
    const lastLevel = levelThresholds[levelThresholds.length - 1];
    return {
      currentLevel: lastLevel.level,
      currentXP: currentXP,
      xpToNextLevel: 0,
      totalXPForNextLevel: lastLevel.maxXP,
      percentageToNextLevel: 100,
    };
  }

  const currentLevel = currentLevelConfig.level;
  const nextLevelConfig = levelThresholds.find(
    (l) => l.level === currentLevel + 1
  );

  if (!nextLevelConfig) {
    // No next level (max level)
    return {
      currentLevel: currentLevel,
      currentXP: currentXP,
      xpToNextLevel: 0,
      totalXPForNextLevel: currentLevelConfig.maxXP,
      percentageToNextLevel: 100,
    };
  }

  return {
    currentLevel: currentLevel,
    currentXP: currentXP,
    xpToNextLevel: nextLevelConfig.minXP - currentXP, // XP needed to reach next level
    totalXPForNextLevel: nextLevelConfig.maxXP, // Total XP required for next level
    percentageToNextLevel: Math.min(
      100,
      ((currentXP - currentLevelConfig.minXP) /
        (nextLevelConfig.minXP - currentLevelConfig.minXP)) *
        100
    ),
  };
}
