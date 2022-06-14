import { abilities, AbilityName } from "../content/abilities.js";
import { EncounterName } from "../content/encounters.js";
import {
  BattleCard,
  battleCards,
  ChallengeCard,
  challengeCards,
  corrdiorCards,
  CorridorCard,
  RoomCard,
  roomCards,
} from "../content/exploration-cards.js";
import { Characteristic, HeroName } from "../content/heroes.js";
import { ItemName } from "../content/items.js";

export interface CampaignState {
  readonly completedEncounters: readonly EncounterName[];
  readonly currentEncounter: EncounterName | null;

  readonly tokens: Readonly<
    Record<"charm" | "healing-potion" | "toolkit" | "firewood", 0 | 1 | 2 | 3>
  >;

  readonly reputation: `${"goodwill" | "corruption"} ${"1" | "2" | "3" | "4"}`;

  readonly roomDeck: ExplorationCardDeck<RoomCard>;
  readonly corridorDeck: ExplorationCardDeck<CorridorCard>;
  readonly battleDeck: ExplorationCardDeck<BattleCard>;
  readonly challengeDeck: ExplorationCardDeck<ChallengeCard>;

  readonly unassignedAbilities: readonly AbilityName[];
  readonly unassignedItems: readonly ItemName[];
  readonly gold: number;

  readonly heroes: Readonly<Partial<Record<HeroName, HeroState>>>;
  readonly totalXp: number;
}

export interface ExplorationCardDeck<
  T extends RoomCard | CorridorCard | BattleCard | ChallengeCard
> {
  readonly drawPile: readonly T[];
  readonly discardPile: readonly T[];
}

export interface HeroState {
  readonly characteristics: Readonly<Record<Characteristic, 0 | 1 | 2 | 3 | 4>>;
  readonly abilities: Readonly<Partial<Record<AbilityName, 1 | 2>>>;
  readonly items: readonly ItemName[];
  readonly spentXp: number;
}

export function initCampaignState(): CampaignState {
  return {
    completedEncounters: [],
    currentEncounter: null,
    tokens: { charm: 3, "healing-potion": 3, toolkit: 3, firewood: 3 },
    reputation: "goodwill 1",
    roomDeck: { drawPile: roomCards.slice(0, 13), discardPile: [] },
    corridorDeck: { drawPile: corrdiorCards, discardPile: [] },
    battleDeck: { drawPile: battleCards.slice(0, 8), discardPile: [] },
    challengeDeck: { drawPile: challengeCards.slice(0, 8), discardPile: [] },
    unassignedAbilities: Object.keys(abilities) as AbilityName[],
    unassignedItems: [],
    gold: 0,
    heroes: {},
    totalXp: 3,
  };
}
