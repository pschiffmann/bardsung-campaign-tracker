import { AbilityName } from "./abilities.js";

export type HeroPath =
  | "beasts"
  | "blood"
  | "damnation"
  | "elements"
  | "faith"
  | "flame"
  | "honour"
  | "omens"
  | "serenity"
  | "shadow"
  | "spirits"
  | "steel"
  | "wilds";

export type HeroName =
  | "Dawnguard"
  | "Dæmonblade"
  | "Fatesong"
  | "Firesoul"
  | "Forgewarden"
  | "Gladestrider"
  | "Lightweaver"
  | "Nightfeather"
  | "Pathseeker"
  | "Skullsplitter"
  | "Stoneheart"
  | "Swiftclaw"
  | "Wyldshell";

export type Characteristic = "str" | "dex" | "int" | "wis" | "con" | "cha";

export type ItemUpgradeSlots = readonly [
  level1: number,
  level2: number,
  level3: number
];

export interface HeroData {
  readonly path: HeroPath;
  readonly startCharacteristics: Readonly<
    Partial<Record<Characteristic, 1 | 2>>
  >;
  readonly startAbilities: readonly AbilityName[];
  readonly gemSlots: ItemUpgradeSlots;
  readonly runeSlots: ItemUpgradeSlots;
}

export const characteristics: readonly Characteristic[] = [
  "str",
  "dex",
  "int",
  "wis",
  "con",
  "cha",
];

export const heroes: Readonly<Record<HeroName, HeroData>> = {
  Dawnguard: {
    path: "faith",
    startCharacteristics: { cha: 2, con: 1 },
    startAbilities: ["Guiding Strike", "Steadfast", "Fear of God"],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Dæmonblade: {
    path: "damnation",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Fatesong: {
    path: "serenity",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Firesoul: {
    path: "flame",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Forgewarden: {
    path: "honour",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Gladestrider: {
    path: "beasts",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Lightweaver: {
    path: "elements",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Nightfeather: {
    path: "shadow",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Pathseeker: {
    path: "wilds",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Skullsplitter: {
    path: "blood",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Stoneheart: {
    path: "steel",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Swiftclaw: {
    path: "spirits",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
  Wyldshell: {
    path: "omens",
    startCharacteristics: {},
    startAbilities: [],
    gemSlots: [0, 0, 0],
    runeSlots: [0, 0, 0],
  },
};
