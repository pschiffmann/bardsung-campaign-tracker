import { abilities, AbilityName } from "../content/abilities.js";
import { EncounterName } from "../content/encounters.js";
import {
  BattleCard,
  ChallengeCard,
  RoomCard,
} from "../content/exploration-cards.js";
import { Characteristic, HeroName } from "../content/heroes.js";
import { ItemName } from "../content/items.js";

export interface CampaignState {
  readonly completedEncounters: readonly EncounterName[];
  readonly currentEncounter: EncounterName | null;

  readonly tokens: Readonly<
    Record<"charm" | "healing-potion" | "toolkit" | "firewood", 0 | 1 | 2 | 3>
  >;

  /**
   * 1 = corruption 4, 8 = goodwill 4
   */
  readonly reputation: `${"goodwill" | "corruption"} ${"1" | "2" | "3" | "4"}`;

  readonly roomDeck: readonly RoomCard[];
  readonly battleDeck: readonly BattleCard[];
  readonly challengeDeck: readonly ChallengeCard[];

  readonly unassignedAbilities: readonly AbilityName[];
  readonly unassignedItems: readonly ItemName[];
  readonly gold: number;

  readonly heroes: Readonly<Partial<Record<HeroName, HeroState>>>;
  readonly totalXp: number;
}

export interface HeroState {
  readonly characteristics: Readonly<Record<Characteristic, 0 | 1 | 2 | 3 | 4>>;
  readonly abilities: Readonly<Partial<Record<AbilityName, 1 | 2>>>;
  readonly items: Readonly<Partial<Record<ItemName, 1 | 2 | 3>>>;
  readonly spentXp: number;
}

export function initCampaignState(): CampaignState {
  return {
    completedEncounters: [],
    currentEncounter: null,
    tokens: { charm: 3, "healing-potion": 3, toolkit: 3, firewood: 3 },
    reputation: "goodwill 1",
    roomDeck: [
      "R1",
      "R2",
      "R3",
      "R4",
      "R5",
      "R6",
      "R7",
      "R8",
      "R9",
      "R10",
      "R11",
      "R12",
      "R13",
    ],
    battleDeck: [
      "B001",
      "B002",
      "B003",
      "B004",
      "B005",
      "B006",
      "B007",
      "B008",
    ],
    challengeDeck: [
      "C001",
      "C002",
      "C003",
      "C004",
      "C005",
      "C006",
      "C007",
      "C008",
    ],
    unassignedAbilities: Object.keys(abilities) as AbilityName[],
    unassignedItems: [],
    gold: 0,
    heroes: {},
    totalXp: 3,
  };
}
