// types.ts
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export type CharacterLevel = 1 | 2 | 3 | 4 | 5;

export interface CharacterAsset {
  path: string;
  alt: string;
}

// constants.ts
export const BASE_PATH = "/image/character-assets";

export const CHARACTER_ASSETS: Record<
  Gender,
  Record<CharacterLevel, CharacterAsset>
> = {
  [Gender.MALE]: {
    1: {
      path: `${BASE_PATH}/man/man-1.png`,
      alt: "Male character level 1",
    },
    2: {
      path: `${BASE_PATH}/man/man-2.png`,
      alt: "Male character level 2",
    },
    3: {
      path: `${BASE_PATH}/man/man-3.png`,
      alt: "Male character level 3",
    },
    4: {
      path: `${BASE_PATH}/man/man-4.png`,
      alt: "Male character level 4",
    },
    5: {
      path: `${BASE_PATH}/man/man-5.png`,
      alt: "Male character level 5",
    },
  },
  [Gender.FEMALE]: {
    1: {
      path: `${BASE_PATH}/women/women-1.png`,
      alt: "Female character level 1",
    },
    2: {
      path: `${BASE_PATH}/women/women-2.png`,
      alt: "Female character level 2",
    },
    3: {
      path: `${BASE_PATH}/women/women-3.png`,
      alt: "Female character level 3",
    },
    4: {
      path: `${BASE_PATH}/women/women-4.png`,
      alt: "Female character level 4",
    },
    5: {
      path: `${BASE_PATH}/women/women-5.png`,
      alt: "Female character level 5",
    },
  },
};

// utils.ts
export const getCharacterAsset = (
  gender: Gender,
  level: number
): CharacterAsset => {
  if (level < 1 || level > 5) {
    throw new Error(`Invalid level: ${level}. Level must be between 1 and 5`);
  }

  const asset = CHARACTER_ASSETS[gender][level as CharacterLevel];
  if (!asset) {
    throw new Error(`No asset found for gender ${gender} and level ${level}`);
  }
  return asset;
};
