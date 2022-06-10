import { AbilityName } from "./abilities.js";
import { ItemName } from "./items.js";

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

export interface HeroData {
  readonly path: HeroPath;
  readonly startCharacteristics: {
    readonly str?: 1 | 2;
    readonly dex?: 1 | 2;
    readonly int?: 1 | 2;
    readonly wis?: 1 | 2;
    readonly con?: 1 | 2;
    readonly cha?: 1 | 2;
  };
  readonly startAbilities: readonly AbilityName[];
  readonly startItems: readonly ItemName[];
}

export const heroes: Readonly<Record<HeroName, HeroData>> = {
  Dawnguard: {
    path: "faith",
    startCharacteristics: { cha: 2, con: 1 },
    startAbilities: ["Guiding Strike", "Steadfast", "Fear of God"],
    startItems: ["Blessed Mace", "Sunshield"],
  },
  Dæmonblade: {
    path: "damnation",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Fatesong: {
    path: "serenity",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Firesoul: {
    path: "flame",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Forgewarden: {
    path: "honour",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Gladestrider: {
    path: "beasts",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Lightweaver: {
    path: "elements",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Nightfeather: {
    path: "shadow",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Pathseeker: {
    path: "wilds",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Skullsplitter: {
    path: "blood",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Stoneheart: {
    path: "steel",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Swiftclaw: {
    path: "spirits",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
  Wyldshell: {
    path: "omens",
    startCharacteristics: {},
    startAbilities: [],
    startItems: [],
  },
};
