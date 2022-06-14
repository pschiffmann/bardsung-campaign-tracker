import { DeepWritable } from "ts-essentials";
import * as content from "../content/index.js";
import {
  BattleCard,
  ChallengeCard,
  CorridorCard,
  RoomCard,
} from "../content/index.js";
import { HistoryEntry } from "./history.js";
import { CampaignState, ExplorationCardDeck } from "./state.js";

export function reduce(
  prev: CampaignState,
  action: HistoryEntry
): CampaignState {
  return reducers[action.type](prev, action as any);
}

type EntryOfType<E, T> = E extends { readonly type: T } ? E : never;

type Reducers = {
  [K in HistoryEntry["type"]]: (
    prev: CampaignState,
    action: EntryOfType<HistoryEntry, K>
  ) => CampaignState;
};

const reducers: Reducers = {
  "start-campaign"(prev, action) {
    if (Object.getOwnPropertyNames(action.heroes).length === 0) {
      throw new Error("`heroes` must not be empty.");
    }
    if (Object.getOwnPropertyNames(prev.heroes).length !== 0) {
      throw new Error("`start-campaign` must be the first history entry.");
    }
    const heroes: DeepWritable<CampaignState["heroes"]> = {};
    const unassignedAbilities = new Set(prev.unassignedAbilities);
    for (const name of action.heroes) {
      const heroData = content.heroes[name];
      heroes[name] = {
        characteristics: {
          str: 0,
          dex: 0,
          int: 0,
          wis: 0,
          con: 0,
          cha: 0,
          ...heroData.startCharacteristics,
        },
        abilities: {},
        items: [],
        spentXp: 0,
      };
      for (const ability of heroData.startAbilities) {
        heroes[name]!.abilities[ability] = 1;
        unassignedAbilities.delete(ability);
      }
    }
    return { ...prev, heroes, unassignedAbilities: [...unassignedAbilities] };
  },
  "start-encounter"(prev, action) {
    return prev;
  },
  "exhaust-token"(prev, action) {
    const n = prev.tokens[action.token];
    if (n === 0) throw new Error("No token left.");
    return { ...prev, tokens: { ...prev.tokens, [action.token]: n - 1 } };
  },
  "buy-token"(prev, action) {
    const n = prev.tokens[action.token];
    if (n === 3) throw new Error("No token exhausted.");
    if (prev.gold < 7) throw new Error("Not enough gold.");
    return {
      ...prev,
      tokens: { ...prev.tokens, [action.token]: n + 1 },
      gold: prev.gold - 7,
    };
  },
  "draw-exploration-card"(prev, action) {
    let prop: "roomDeck" | "corridorDeck" | "battleDeck" | "challengeDeck";
    switch (action.card[0]) {
      case "R":
        prop = "roomDeck";
        break;
      case "P":
        prop = "corridorDeck";
        break;
      case "B":
        prop = "battleDeck";
        break;
      case "C":
        prop = "challengeDeck";
        break;
      default:
        throw new Error("Invalid card.");
    }
    const { drawPile, discardPile } = prev[prop] as ExplorationCardDeck<
      RoomCard | CorridorCard | BattleCard | ChallengeCard
    >;
    if (!drawPile.includes(action.card)) {
      throw new Error("Challenge deck doesn't contain this card.");
    }
    return {
      ...prev,
      [prop]: {
        drawPile: drawPile.filter((name) => name !== action.card),
        discardPile: [...discardPile, action.card],
      },
    };
  },
  "shuffle-exploration-deck"(prev, action) {
    const prop = `${action.deck}Deck` as const;
    const { drawPile, discardPile } = prev[prop];
    return {
      ...prev,
      [prop]: {
        drawPile: [...drawPile, ...discardPile].sort(),
        discardPile: [],
      },
    };
  },
  "enhance-ability"(prev, action) {
    const hero = prev.heroes[action.hero]!;
    const abilityData = content.abilities[action.ability];
    if (hero.abilities[action.ability] !== 1) {
      throw new Error("Can't enhance this ability.");
    }
    if (prev.totalXp - hero.spentXp < abilityData.enhanceCost) {
      throw new Error("Not enough XP.");
    }
    return {
      ...prev,
      heroes: {
        ...prev.heroes,
        [action.hero]: {
          ...hero,
          abilities: { ...hero.abilities, [action.ability]: 2 },
          spentXp: hero.spentXp + abilityData.enhanceCost,
        },
      },
    };
  },
  "level-up-characteristic"(prev, action) {
    const hero = prev.heroes[action.hero]!;
    const newLevel = hero.characteristics[action.characteristic] + 1;
    if (prev.totalXp - hero.spentXp < newLevel) {
      throw new Error("Not enough XP.");
    }
    return {
      ...prev,
      heroes: {
        ...prev.heroes,
        [action.hero]: {
          ...hero,
          characteristics: {
            ...hero.characteristics,
            [action.characteristic]: newLevel,
          },
          spentXp: hero.spentXp + newLevel,
        },
      },
    };
  },
};
