import { BattleCard, ChallengeCard, RoomCard } from "./exploration-cards.js";

export interface ChapterData {
  readonly addRoomCards: readonly RoomCard[];
  readonly removeRoomCards: readonly RoomCard[];
  readonly addBattleCards: readonly BattleCard[];
  readonly removeBattleCards: readonly BattleCard[];
  readonly addChallengeCards: readonly ChallengeCard[];
  readonly removeChallengeCards: readonly ChallengeCard[];
  readonly lostTreasure: number;
  readonly goals: Readonly<Record<string, GoalReward>>;
  readonly encounters: number;
}

export const chapters: Readonly<Record<string, ChapterData>> = {
  "1": {
    addRoomCards: [],
    removeRoomCards: [],
    addBattleCards: ["B136", "B137"],
    removeBattleCards: [],
    addChallengeCards: ["C037", "C038", "C039", "C040", "C041"],
    removeChallengeCards: [],
    lostTreasure: 4,
    goals: {
      "Completed encounter: 1": { type: "XP", value: 1 },
      "Completed encounter: 2": { type: "XP", value: 1 },
      "Completed encounter: 3": { type: "XP", value: 1 },
      "Discover lost treasure": { type: "XP", value: 1 },
      "Complete chapter": { type: "XP", value: 3 },
    },
    encounters: 5,
  },
};

export interface GoalReward {
  readonly type: "XP" | "lost treasure" | "treasure" | "other";
  readonly value: number;
}

const missingChapter: ChapterData = {
  addRoomCards: [],
  removeRoomCards: [],
  addBattleCards: [],
  removeBattleCards: [],
  addChallengeCards: [],
  removeChallengeCards: [],
  lostTreasure: 0,
  goals: {},
  encounters: 1,
};
for (let i = 2; i <= 31; i++) {
  (chapters as any)[i] = missingChapter;
}

const lowerCaseA = "a".codePointAt(0)!;
export function encounterNumToChar(num: number): string {
  return String.fromCodePoint(lowerCaseA + num);
}
